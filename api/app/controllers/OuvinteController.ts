import { IsNotEmpty, IsString } from "class-validator";
import { Body, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import Ouvinte from "../models/Ouvinte"
import OuvinteRepository from "../repositories/OuvinteRepository"

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
    
}