import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Body, BodyParam, Delete, Get, HeaderParam, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import { isNumber, isString } from "util";
import Ouvinte from "../models/Ouvinte"
import OuvinteRepository from "../repositories/OuvinteRepository"

class UpdateRequest {
    @IsNumber()
    id: number = 0;

    @IsString()
    @IsNotEmpty()
    nome: string = "";
}

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

// TODO: 
/*
    Adicionar jwt
    Documentar
    Listar, adicionar, remover músicas. n:n
    Listar, adicionar, remover playlists privadas. n:n
    Listar, seguir, deixar de seguir playlists públicas. n:n
*/


@JsonController("/ouvinte")
export default class OuvinteController {

    @Inject()
    private ouvinteRepository!: OuvinteRepository;
    
    @Get("/")
    async getAll(@HeaderParam("token") token: string) {
        if(!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        
        return { "ouvintes": await this.ouvinteRepository.getAll() };
    }

    @Get("/:id")
    async getById(
        @HeaderParam("token") token: string,
        @Param("id") id: number
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const ouvinte = await this.ouvinteRepository.getById(id);
        if(ouvinte === null)
            return {"erro": "OUVINTE_INVALIDO" };

        return {
            "ouvinte":
            {
                "id": ouvinte.id,
                "nome": ouvinte.nome,
                "email": ouvinte.email,
                "cpf": ouvinte.cpf
            }    
        };
    }

    @Post("/")
    async insertOne(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest
    ){
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        
        const ouvinte = new Ouvinte(0, req.cpf, req.nome, req.email, req.senha)
        await this.ouvinteRepository.add(ouvinte);
        return { "sucesso": true };
    }

    @Put("/")
    async update(
        @HeaderParam("token") token: string,
        @Body({validate: true}) req: UpdateRequest

    ){
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const ouvinte = await this.ouvinteRepository.getById(req.id);
        if(ouvinte === null)
            return {"erro": "OUVINTE_INVALIDO"};
        
        await this.ouvinteRepository.update(req.id, ouvinte);
        return {"sucesso": true};

    }
    @Delete("/")
    async delete(
        @HeaderParam("token") token: string,
        @BodyParam("id") id: number
    ) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isNumber(token))
            return { "erro": "ID_INVALIDO" };

        const ouvinte = await this.ouvinteRepository.getById(id);
        if(ouvinte === null)
            return {"erro": "OUVINTE_INVALIDO"};
            
        await this.ouvinteRepository.delete(id);
        return {"sucesso": true};
    }
    
}