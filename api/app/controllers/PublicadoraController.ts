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
    
    @Put("/")
    async update(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: UpdateRequest
    ) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const publicadora = await this.publicadoraRepository.getById(Number.parseInt(token));
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        publicadora.cnpj = req.cnpj;

        await this.publicadoraRepository.update(req.id, publicadora);

        return { "sucesso": true };
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

        const publicadora = await this.publicadoraRepository.getById(Number.parseInt(token));
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        await this.publicadoraRepository.delete(id);

        return { "sucesso": true };
    }
}