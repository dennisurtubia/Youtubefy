import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";
import { Body, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import Administrador from "../models/Administrador";
import AdminRepository from "../repositories/AdminRepository";

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsNumber()
    duracao: number = 0;

    @IsBoolean()
    explicito: boolean = false;
}

@JsonController("/musica")
export default class MusicaController {

    @Inject()
    private adminRepository!: AdminRepository;

    @Get("/")
    async getAll(@HeaderParam("token") token: string) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        return { "admins": await this.adminRepository.getAll() };
    }


    @Post("/submit")
    async submitMusic(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest) {

    }


    @Post("/")
    /**
    * @api {get} /user/:id
    */
    async insertOne(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const admin = new Administrador(0, req.cpf, req.nome, req.email, req.senha);
        await this.adminRepository.add(admin);
        return { "sucesso": true };
    }
}