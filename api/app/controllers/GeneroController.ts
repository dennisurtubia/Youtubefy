import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Body, BodyParam, Delete, Get, HeaderParam, JsonController, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import { isNumber, isString } from "util";
import Genero from "../models/Genero";
import AdminRepository from "../repositories/AdminRepository";
import GeneroRepository from "../repositories/GeneroRepository";

class UpdateRequest {
    @IsNumber()
    id: number = 0;

    @IsString()
    @IsNotEmpty()
    nome: string = "";
}

@JsonController("/genero")
export default class GeneroController {

    @Inject()
    private generoRepository!: GeneroRepository;

    @Inject()
    private adminRepository!: AdminRepository;

    /**
     * 
     * @api {get} /genero/:id Informações do gênero
     * @apiName InfoGenero
     * @apiGroup Genero
     * 
     * @apiHeader {String} token Token do Administrador (por enquanto é o id)
     * @apiHeaderExample {json} Exemplo Header:
     *    { 
     *       "token": "1234"  
     *    }
     * @apiSuccessExample {json} Resposta bem sucessida:
     * {
      *  "generos": [
     *      {
     *          "id": 1,
     *          "nome": "Dennis"
     *      },
     *      {
     *          "id": 2,
     *          "nome": "Aventura"
     *      }
     *  ]
     * }
     * @apiErrorExample {json} Resposta com erro:
     *   {
     *        "erro": "TOKEN_INVALIDO"
     *   } 
     *
     */
    @Get("/")
    async get(
        @HeaderParam("token") token: string
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const generos = await this.generoRepository.getAll();

        return { "generos": generos.map(({ idAdministrador, ...attrs }) => attrs) };
    }


    /**
     * 
     * @api {get} /genero Listar todos os gêneros
     * @apiName ListarGeneros
     * @apiGroup Genero
     * 
     * @apiHeader {String} token Token do Administrador (por enquanto é o id)
     * @apiHeaderExample {json} Exemplo Header:
     *    { 
     *       "token": "1234"  
     *    }
     * @apiSuccessExample {json} Resposta bem sucessida:
     * {
      *  "generos": [
     *      {
     *          "id": 1,
     *          "nome": "Dennis"
     *      },
     *      {
     *          "id": 2,
     *          "nome": "Aventura"
     *      }
     *  ]
     * }
     * @apiErrorExample {json} Resposta com erro:
     *   {
     *        "erro": "TOKEN_INVALIDO"
     *   } 
     *
     */
    @Get("/")
    async getAll(
        @HeaderParam("token") token: string
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const generos = await this.generoRepository.getAll();

        return { "generos": generos.map(({ idAdministrador, ...attrs }) => attrs) };
    }

    /**
     * 
     * @api {post} /genero Inserir gênero
     * @apiName InserirGenero
     * @apiGroup Genero
     * 
     * @apiHeader {String} token Token do Administrador (por enquanto é o id)
     * @apiParam  {String} nome Nome do gênero
     * @apiHeaderExample {json} Exemplo Header:
     *    {
     *       "token": "1234"       
     *    }
     * @apiParamExample  {json} Exemplo:
     *    {
     *        "nome": "Ação"
     *    }
     * @apiSuccessExample {json} Resposta bem sucessida:
     *    {
     *        "sucesso": true
     *    }
     * @apiErrorExample {json} Resposta com erro:
     *   {
     *        "erro": "ADMIN_INVALIDO"
     *   } 
     *
     */
    @Post("/")
    async insert(
        @HeaderParam("token") token: string,
        @BodyParam("nome") nome: string
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isString(nome) || nome.length <= 0)
            return { "erro": "ERRO_BODY" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero = new Genero(0, nome);
        genero.idAdministrador = admin.id;
        await this.generoRepository.add(genero);

        return { "sucesso": true };
    }

    /**
    * 
    * @api {put} /genero Atualizar gênero
    * @apiName AtualizarGenero
    * @apiGroup Genero
    * 
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {number} id ID do gênero
    * @apiParam  {String} nome Novo nome do gênero
    * @apiHeaderExample {json} Exemplo Header:
    *    {
    *       "token": "1234"       
    *    }
    * @apiParamExample  {json} Exemplo:
    *    {
    *        "id": 1,
    *        "nome": "Novo nome"
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
        @Body({ validate: true }) req: UpdateRequest
    ) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero = await this.generoRepository.getById(req.id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };

        genero.nome = req.nome;
        await this.generoRepository.update(req.id, genero);

        return { "sucesso": true };
    }

    /**
    * 
    * @api {delete} /genero Remover gênero
    * @apiName RemoverGenero
    * @apiGroup Genero
    * 
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {number} id ID do gênero
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
    *        "erro": "GENERO_INVALIDO"
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

        if (!isNumber(token))
            return { "erro": "ID_INVALIDO" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero = await this.generoRepository.getById(id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };

        await this.generoRepository.delete(id);

        return { "sucesso": true };
    }
}