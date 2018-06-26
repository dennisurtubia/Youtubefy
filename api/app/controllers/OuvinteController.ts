import { compare, hash } from "bcrypt";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { sign } from "jsonwebtoken";
import { Authorized, Body, CurrentUser, Get, JsonController, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import Ouvinte from "../models/Ouvinte";
import OuvinteRepository from "../repositories/OuvinteRepository";


class InsertRequest {

    @IsString()
    @IsNotEmpty()
    cpf: string = "";

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

@JsonController("/ouvinte")
export default class OuvinteController {

    @Inject()
    private ouvinteRepository!: OuvinteRepository;

    // ------------------------------------------------------ CRUD ------------------------------------------------------

    /**
    * 
    * @api {get} /ouvinte Informações do ouvinte
    * @apiName InfoOuvinte
    * @apiGroup Ouvinte
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/ouvinte?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cpf": "11111111111",
    *       "tipoUser": 1
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *        "erro": "OUVINTE_INVALIDO"
    *   } 
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    */
    @Authorized("OUVINTE")
    @Get("/")
    async get(
        @CurrentUser({ required: true }) email: string
    ) {

        const ouvinte = await this.ouvinteRepository.getByEmail(email);
        if (ouvinte === null)
            return { "erro": "OUVINTE_INVALIDO" };

        return {
            "id": ouvinte.id,
            "nome": ouvinte.nome,
            "email": ouvinte.email,
            "cpf": ouvinte.cpf,
            "tipoUser": 1
        };
    }

    /**
    * 
    * @api {post} /ouvinte/signup Cadastrar ouvinte
    * @apiName CadastrarOuvinte
    * @apiGroup Ouvinte
    * 
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cpf CPF
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cpf": "11111111111"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "EMAIL_EXISTENTE"
    *   } 
    * @apiErrorExample {json} Erro BD:
    *   {
    *       "erro": "ERRO_BD"
    *   } 
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }  
    */
    @Post("/signup")
    async signup(
        @Body({ validate: true }) req: InsertRequest
    ) {
        let ouvinte = await this.ouvinteRepository.getByEmail(req.email);
        if (ouvinte !== null)
            return { "erro": "EMAIL_EXISTENTE" };

        const hashSenha = await hash(req.senha, 1024);
        ouvinte = new Ouvinte(0, req.cpf, req.nome, req.email, hashSenha);

        const insertId = await this.ouvinteRepository.add(ouvinte);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };

        return { "sucesso": true };
    }

    /**
    * 
    * @api {put} /ouvinte Atualizar ouvinte
    * @apiName AtualizarOuvinte
    * @apiGroup Ouvinte
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiParam  {String} nome Novo nome
    * @apiParam  {String} email Novo email
    * @apiParam  {String} senha Nova senha
    * @apiParam  {String} cpf Novo CPF
    * @apiParamExample  {json} Exemplo:
    *    {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cpf": "11111111111"
    *    }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *    {
    *        "sucesso": true
    *    }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "OUVINTE_INVALIDO"
    *   } 
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }  
    */
    @Authorized("OUVINTE")
    @Put("/")
    async update(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ) {

        const ouvinte = await this.ouvinteRepository.getByEmail(email)
        if (ouvinte === null)
            return { "erro": "ADMIN_INVALIDO" };

        ouvinte.nome = req.nome;
        ouvinte.email = req.email;
        ouvinte.senha = await hash(req.senha, 1024);
        ouvinte.cpf = req.cpf;
        await this.ouvinteRepository.update(ouvinte.id, ouvinte);

        return { "sucesso": true };
    }

    // ------------------------------------------------------ REGRAS DE NEGOCIO ------------------------------------------------------

    /**
    * 
    * @api {post} /ouvinte/signin Login ouvinte
    * @apiName LoginOuvinte
    * @apiGroup Ouvinte
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
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }  
    */
    @Post("/signin")
    async signin(
        @Body({ validate: true }) req: LoginRequest
    ) {

        let ouvinte = await this.ouvinteRepository.getByEmail(req.email);
        if (ouvinte === null)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const match = await compare(req.senha, ouvinte.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const token = sign(ouvinte.email, "supersecret");

        return { "token": token };
    }

    // ------------------------------------------------------ 1:N ------------------------------------------------------

    // listar playlists privadas

    // ------------------------------------------------------ N:N ------------------------------------------------------

    // listar músicas
    // adicionar músicas
    // remover músicas

    // listar playlists publicas seguidas
    // seguir playlist publica
    // des-seguir playlist publica
}