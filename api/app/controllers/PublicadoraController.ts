import { IsNotEmpty, IsString } from "class-validator";
import { Body, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import Publicadora from "../models/Publicadora"
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

@JsonController("/publicadora")
export default class PublicadoraController {

    @Inject()
    private publicadoraRepository!: PublicadoraRepository;
    
    @Get("/")
    async getAll(@HeaderParam("token") token: string) {
        if(!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO"};

        return { "Publicadoras": await this.publicadoraRepository.getAll() };     
    }

    @Post("/")
    async insertOne(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest
    ) {
        if (!isString(token) || token.length <= 0 )
            return { "erro": "TOKEN_INVALIDO"};
        
        const publicadora = new Publicadora(0, req.cnpj, req.nome, req.email, req.senha)
        await this.publicadoraRepository.add(publicadora);
        return {"sucesso": true};
    }        
}