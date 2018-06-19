import { IsNotEmpty, IsString } from "class-validator";
import { Body, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
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

    @Get("/")
    async getAll(@HeaderParam("token") token: string) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        return { "admins": await this.adminRepository.getAll() };
    }


    @Post("/")
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