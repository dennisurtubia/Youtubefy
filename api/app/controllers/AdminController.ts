import { compare, hash } from "bcrypt";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { sign } from "jsonwebtoken";
import { Authorized, Body, CurrentUser, Get, JsonController, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import Administrador from "../models/Administrador";
import AdminRepository from "../repositories/AdminRepository";


// TODO:
/*
    Listar gêneros administrados pelo admin. 1:n
    Listar playlists administradas pelo admin. 1:n
    Listar músicas avaliadas pelo admin. 1:n
*/

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    cpf: string = "";

    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsString()
    @IsEmail()
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

@JsonController("/admin")
export default class AdminController {

    @Inject()
    private adminRepository!: AdminRepository;


    /**
    * 
    * @api {get} /admin Informações do administrador
    * @apiName InfoAdmin
    * @apiGroup Admin
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cpf": "11111111111"
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    *
    */
    @Authorized("ADMIN")
    @Get("/")
    async get(
        @CurrentUser({ required: true }) email: string
    ) {

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        return {
            "id": admin.id,
            "nome": admin.nome,
            "email": admin.email,
            "cpf": admin.cpf
        }
    }

    /**
    * 
    * @api {post} /admin/signup Cadastrar administrador
    * @apiName CadastrarAdmin
    * @apiGroup Admin
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
    async insert(
        @Body({ validate: true }) req: InsertRequest
    ) {

        let admin = await this.adminRepository.getByEmail(req.email);
        if (admin !== null)
            return { "erro": "EMAIL_EXISTENTE" };

        const hashSenha = await hash(req.senha, 1024);
        admin = new Administrador(0, req.cpf, req.nome, req.email, hashSenha);

        const insertId = await this.adminRepository.add(admin);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };

        return { "sucesso": true };
    }

    /**
    * 
    * @api {post} /admin/signin Login administrador
    * @apiName LoginAdmin
    * @apiGroup Admin
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
    * @apiErrorExample {json} Email/senha incorretos:
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

        let admin = await this.adminRepository.getByEmail(req.email);
        if (admin === null)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const match = await compare(req.senha, admin.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const token = sign(admin.email, "supersecret");

        return { "token": token };
    }

    /**
    * 
    * @api {put} /admin Atualizar administrador
    * @apiName AtualizarAdmin
    * @apiGroup Admin
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
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }  
    */
    @Authorized("ADMIN")
    @Put("/")
    async update(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ) {

        const admin = await this.adminRepository.getByEmail(email)
        if (admin === null)
            return;

        admin.nome = req.nome;
        admin.email = req.email;
        admin.senha = await hash(req.senha, 1024);
        admin.cpf = req.cpf;
        await this.adminRepository.update(admin.id, admin);

        return { "sucesso": true };
    }
}