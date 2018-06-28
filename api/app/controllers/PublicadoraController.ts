import { compare, hash } from "bcrypt";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { sign } from "jsonwebtoken";
import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import Publicadora from "../models/Publicadora";
import AlbumRepository from "../repositories/AlbumRepository";
import PublicadoraRepository from "../repositories/PublicadoraRepository";

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    cnpj: string = "";

    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsString()
    @IsNotEmpty()
    email: string = "";

    @IsString()
    @IsNotEmpty()
    senha: string = "";
}

class LoginRequest {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string = "";

    @IsString()
    @IsNotEmpty()
    senha: string = "";
}

@JsonController("/publicadora")
export default class PublicadoraController {

    @Inject()
    private publicadoraRepository!: PublicadoraRepository;

    @Inject()
    private albumRepository!: AlbumRepository;

    // ------------------------------------------------------ CRUD ------------------------------------------------------

    /**
    * 
    * @api {get} /publicadora Lista de Publicadoras
    * @apiName ListaPublicadora
    * @apiGroup Publicadora
    * 
    * @apiSuccessExample {json} Resposta bem sucessida:
    * {
    *   "publicadoras": [
    *       {
    *           "id": 86,
    *           "nome": "admin"
    *       }
    *   ]
    * }
    *
    */
    @Get("/")
    async getAll(
    ) {
        const publicadoras = await this.publicadoraRepository.getAll();

        return {
            "publicadoras": publicadoras.map(({ cnpj, email, senha, ...params }) => params)
        };
    }

    /**
    * 
    * @api {get} /publicadora/:id/info Informações da publicadora
    * @apiName InfoPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {number} id ID
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cnpj": "11111111111",
            "tipoUser": 2
    *   }
    * @apiErrorExample {json} Publicadora inválida:
    *   {
    *        "erro": "PUBLICADORA_INVALIDA"
    *   } 
    *
    */
    @Get("/:id/info")
    async getById(
        @Param("id") id: number
    ) {

        const publicadora = await this.publicadoraRepository.getById(id);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        return {
            "id": publicadora.id,
            "nome": publicadora.nome,
            "email": publicadora.email,
            "cnpj": publicadora.cnpj,
            "tipoUser": 2
        };
    }


    /**
    * 
    * @api {get} /publicadora/info Informações da publicadora
    * @apiName InfoPublicadora2
    * @apiGroup Publicadora
    * 
    * @apiParam  {string} token Token
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cnpj": "11111111111",
            "tipoUser": 2
    *   }
    * @apiErrorExample {json} Publicadora inválida:
    *   {
    *        "erro": "PUBLICADORA_INVALIDA"
    *   } 
    *
    */
    @Authorized("PUBLICADORA")
    @Get("/info")
    async get(
        @CurrentUser({ required: true }) email: string,
    ) {
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        return {
            "id": publicadora.id,
            "nome": publicadora.nome,
            "email": publicadora.email,
            "cnpj": publicadora.cnpj,
            "tipoUser": 2
        };
    }

    /**
    * 
    * @api {post} /publicadora/signup Cadastrar publicadora
    * @apiName CadastrarPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cnpj CNPJ
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cnpj": "11111111111"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "EMAIL_EXISTENTE"
    *   } 
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ERRO_BD"
    *   } 
    */

    @Post("/signup")
    async signup(
        @Body({ validate: true }) req: InsertRequest
    ) {

        let publicadora = await this.publicadoraRepository.getByEmail(req.email);
        if (publicadora !== null)
            return { "erro": "EMAIL_EXISTENTE" };

        const hashSenha = await hash(req.senha, 1024);
        publicadora = new Publicadora(0, req.cnpj, req.nome, req.email, hashSenha);

        const insertId = await this.publicadoraRepository.add(publicadora);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };

        return { "sucesso": true };
    }


    /**
    * 
    * @api {put} /publicadora/update Atualizar dados publicadora
    * @apiName AtualizarPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cnpj CNPJ
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cnpj": "11111111111"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Publicadora inválida
    *   {
    *       "erro": "PUBLICADORA_INVALIDA"
    *   } 
    * @apiErrorExample {json} Erro BD:
    *   {
    *       "erro": "ERRO_BD"
    *   } 
    */
    @Authorized("PUBLICADORA")
    @Put("/")
    async update(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ) {

        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        publicadora.cnpj = req.cnpj;
        publicadora.nome = req.nome;
        publicadora.senha = req.senha;

        await this.publicadoraRepository.update(publicadora.id, publicadora);

        return { "sucesso": true };
    }

    // ------------------------------------------------------ REGRAS DE NEGÓCIO ------------------------------------------------------

    /**
    * 
    * @api {post} /publicadora/signin Login publicadora
    * @apiName LoginPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "email": "a@a.com",
    *       "senha": "9876"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "token": "deadbeef"
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "INFORMACOES_INCORRETAS"
    *   } 
    */
    @Post("/signin")
    async signin(
        @Body({ validate: true }) req: LoginRequest
    ) {

        let admin = await this.publicadoraRepository.getByEmail(req.email);
        if (admin === null)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const match = await compare(req.senha, admin.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const token = sign(admin.email, "supersecret");

        return { "token": token };
    }

    // ------------------------------------------------------ 1:N ------------------------------------------------------


    /**
    * 
    * @api {get} /publicadora/:id/albuns Albuns da publicadora
    * @apiName AlbunsPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {number} id ID
    * @apiParamExample  {json} Request-Example:
    *    https://utfmusic.me/v1/publicadora/1/albuns
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cnpj": "11111111111",
            "tipoUser": 2
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *        "erro": "PUBLICADORA_INVALIDA"
    *   } 
    *
    */
    @Get("/:id/albuns")
    async getAlbuns(
        @Param("id") id: number
    ) {

        const publicadora = await this.publicadoraRepository.getById(id);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        const albuns = await this.albumRepository.getByPublicadora(id);
        return {
            "albuns": albuns
        }
    }
}