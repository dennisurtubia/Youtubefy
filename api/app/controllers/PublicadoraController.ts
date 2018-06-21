import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Body, Delete, Get, JsonController, Post, Put, Authorized, CurrentUser } from "routing-controllers";
import { Inject } from "typedi";
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


    @Authorized("PUBLICADORA")
    @Get("/")
    async get(
        @CurrentUser( {required: true} ) email:string
    ) {
        
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if(publicadora === null)
            return {"erro": "PUBLICADORA_INVALIDA"};   

        return {
            "publicadora":
                {
                    "id": publicadora.id,
                    "nome": publicadora.nome,
                    "email": publicadora.email,
                    "cnpj": publicadora.cnpj
                }
        };
    }

    @Post("/")
    async insertOne(
        @Body({required: true}) req: InsertRequest
    ) {
        
        const publicadora = new Publicadora(0, req.cnpj, req.nome, req.email, req.senha)
        await this.publicadoraRepository.add(publicadora);
        return {"sucesso": true};
    }   
    
    @Authorized("PUBLICADORA")
    @Put("/")
    async update(
        @CurrentUser({required: true}) email: string,
        @Body({ validate: true }) req: InsertRequest
    ){
        
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return {"erro": "PUBLICADORA_INVALIDA"};
        
        publicadora.cnpj = req.cnpj;
        publicadora.nome = req.nome;
        publicadora.senha = req.senha;

        return {"sucesso": true};
    }

    @Authorized("PUBLICADORA")
    @Delete("/")
    async delete(
        @CurrentUser({required: true}) email: string,
    ) {
        
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return {"erro": "PUBLICADORA_INVALIDA"};
        
        await this.publicadoraRepository.delete(publicadora.id);

        return { "sucesso": true };
    }
}