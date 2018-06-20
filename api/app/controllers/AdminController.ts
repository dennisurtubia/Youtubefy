import { IsNotEmpty, IsString } from "class-validator";
import { Body, BodyParam, Delete, Get, HeaderParam, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import { isNumber, isString } from "util";
import Administrador from "../models/Administrador";
import AdminRepository from "../repositories/AdminRepository";

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

@JsonController("/admin")
export default class AdminController {

    @Inject()
    private adminRepository!: AdminRepository;

    /**
    * 
    * @api {get} /admin/:id Informações do administrador
    * @apiName InfoAdmin
    * @apiGroup Admin
    * 
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiHeaderExample {json} Exemplo Header:
    *   { 
    *       "token": "1234"  
    *   }
    * @apiParam  {number} id ID
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "admin": 
    *       {
    *           "id": "1",
    *           "nome": "Doravante",
    *           "email": "a@a.com",
    *           "cpf": "11111111111"
    *       }
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "TOKEN_INVALIDO"
    *   } 
    *
    */
    @Get("/:id")
    async get(
        @HeaderParam("token") token: string,
        @Param("id") id: number
    ) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const admin = await this.adminRepository.getById(id);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        return {
            "admin": {
                "id": admin.id,
                "nome": admin.nome,
                "email": admin.email,
                "cpf": admin.cpf
            }
        }
    }

    /**
    * 
    * @api {get} /admin Listar todos os administradores
    * @apiName ListarAdmins
    * @apiGroup Admin
    * 
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiHeaderExample {json} Exemplo Header:
    *   { 
    *       "token": "1234"  
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "admins": 
    *       [
    *           {
    *               "id": "1",
    *               "nome": "Doravante",
    *               "email": "a@a.com",
    *               "cpf": "11111111111"
    *           },
    *           {
    *               "id": "2",
    *               "nome": "Sebastião",
    *               "email": "b@a.com",
    *               "cpf": "11111111111"
    *           }
    *       ]
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *       "erro": "TOKEN_INVALIDO"
    *   } 
    *
    */
    @Get("/")
    async getAll(
        @HeaderParam("token") token: string
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admins = await this.adminRepository.getAll();
        return { "admins": admins.map(({ senha, ...attrs }) => attrs) };
    }


    /**
    * 
    * @api {post} /admin Cadastrar administrador
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
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "CAMPOS_INVALIDOS"
    *   } 
    *
    */
    @Post("/")
    async insert(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admin = new Administrador(0, req.cpf, req.nome, req.email, req.senha);
        await this.adminRepository.add(admin);

        return { "sucesso": true };
    }

    





    /**
    * 
    * @api {put} /admin Atualizar administrador
    * @apiName AtualizarAdmin
    * @apiGroup Admin
    * 
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {String} nome Novo nome
    * @apiParam  {String} email Novo email
    * @apiParam  {String} senha Nova senha
    * @apiParam  {String} cpf Novo CPF
    * @apiHeaderExample {json} Exemplo Header:
    *    {
    *       "token": "1234"       
    *    }
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
    *        "erro": "GENERO_INVALIDO"
    *   } 
    *
    */
    @Put("/")
    async update(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest
    ) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        admin.nome = req.nome;
        admin.email = req.email;
        admin.senha = req.senha;
        admin.cpf = req.cpf;
        await this.adminRepository.update(Number.parseInt(token), admin);

        return { "sucesso": true };
    }

    /**
    * 
    * @api {delete} /admin Remover administrador
    * @apiName RemoverAdmin
    * @apiGroup Admin
    * 
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {number} id ID
    * @apiHeaderExample {json} Exemplo Header:
    *    {
    *       "token": "1234"       
    *    }
    * @apiParamExample  {json} Exemplo:
    *    {
    *        "id": 1
    *    }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *    {
    *        "sucesso": true
    *    }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "TOKEN_INVALIDO"
    *   } 
    *
    */
    @Delete("/")
    async delete(
        @HeaderParam("token") token: string,
        @BodyParam("id") id: number
    ) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        await this.adminRepository.delete(id);

        return { "sucesso": true };
    }
}