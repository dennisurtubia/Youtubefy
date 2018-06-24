import { compare, hash } from "bcrypt";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { sign } from "jsonwebtoken";
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
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
// TODO:
/*
    Adicionar jwt
    Documentar
    Listar albuns da publicadora. 1:n

*/

@JsonController("/publicadora")
export default class PublicadoraController {

    @Inject()
    private publicadoraRepository!: PublicadoraRepository;

    @Inject()
    private albumRepository!: AlbumRepository;

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
    async insert(
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
    * @api {get} /publicadora Informações da publicadora
    * @apiName InfoPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
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
    @Authorized("PUBLICADORA")
    @Get("/")
    async get(
        @CurrentUser({ required: true }) email: string
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

    /**
    * 
    * @api {delete} /publicadora Remover publicadora
    * @apiName RemoverPublicadora
    * @apiGroup Publicadora
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *    {
    *        "sucesso": true
    *    }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "PUBLICADORA_INVALIDA"
    *   } 
    *
    */
    @Authorized("PUBLICADORA")
    @Delete("/")
    async delete(
        @CurrentUser({ required: true }) email: string,
    ) {

        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        await this.publicadoraRepository.delete(publicadora.id);

        return { "sucesso": true };
    }

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

    @Get("/albuns/:id")
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