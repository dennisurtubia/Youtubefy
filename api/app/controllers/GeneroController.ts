import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Authorized, Body, BodyParam, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
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

// TODO:
/*
    Listar músicas pertencentes ao gênero. 1:n
*/

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
    * @apiParam  {String} token Json Web Token
    * @apiParam  {number} id ID
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero/4?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": 1,
    *       "nome": "Ação"
    *   }
    * @apiErrorExample {json} ID gênero inválido:
    *   {
    *       "erro": "ID_INVALIDO"
    *   } 
    * @apiErrorExample {json} Admin inváludo:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   } 
    * @apiErrorExample {json} Gênero inváludo:
    *   {
    *       "erro": "GENERO_INVALIDO"
    *   } 
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    */
    @Authorized("ADMIN")
    @Get("/:id")
    async get(
        @CurrentUser({ required: true }) email: string,
        @Param("id") id: number
    ) {

        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero: Genero | null = await this.generoRepository.getById(id);

        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };

        return {
            "id": genero.id,
            "nome": genero.nome
        };
    }


    /**
    * 
    * @api {get} /genero Listar todos os gêneros
    * @apiName ListarGeneros
    * @apiGroup Genero
    * 
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "generos": 
    *           [
    *               {
    *                   "id": 1,
    *                   "nome": "Ação"
    *               },
    *               {
    *                   "id": 2,
    *                   "nome": "Aventura"
    *               }
    *           ]
    *   }
    */
    @Get("/")
    async getAll() {

        const generos = await this.generoRepository.getAll();

        return { "generos": generos.map(({ idAdministrador, ...attrs }) => attrs) };
    }

    /**
    * 
    * @api {post} /genero Inserir gênero
    * @apiName InserirGenero
    * @apiGroup Genero
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero?token=deadbeef
    * @apiParam  {String} nome Nome
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Ação"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   } 
    * @apiErrorExample {json} Nome inválido:
    *   {
    *       "erro": "NOME_INVALIDO"
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
    @Authorized("ADMIN")
    @Post("/")
    async insert(
        @CurrentUser({ required: true }) email: string,
        @BodyParam("nome") nome: string
    ) {

        if (!isString(nome) || nome.length <= 0)
            return { "erro": "NOME_INVALIDO" };

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero = new Genero(0, nome, admin.id);
        await this.generoRepository.add(genero);

        return { "sucesso": true };
    }

    /**
    * 
    * @api {put} /genero Atualizar gênero
    * @apiName AtualizarGenero
    * @apiGroup Genero
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero?token=deadbeef
    * @apiParam  {number} id ID
    * @apiParam  {String} nome Novo nome
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "id": 1,
    *       "nome": "Novo nome"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   } 
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "GENERO_INVALIDO"
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
    @Authorized("ADMIN")
    @Put("/")
    async update(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: UpdateRequest
    ) {


        const admin = await this.adminRepository.getByEmail(email);
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
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero?token=deadbeef
    * @apiParam  {number} id ID
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} ID inválido:
    *   {
    *       "erro": "ID_INVALIDO"
    *   } 
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   } 
    * @apiErrorExample {json} Gênero inválido:
    *   {
    *       "erro": "GENERO_INVALIDO"
    *   } 
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    */
    @Authorized("ADMIN")
    @Delete("/")
    async delete(
        @CurrentUser({ required: true }) email: string,
        @BodyParam("id") id: number
    ) {

        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero = await this.generoRepository.getById(id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };

        await this.generoRepository.delete(id);

        return { "sucesso": true };
    }
}