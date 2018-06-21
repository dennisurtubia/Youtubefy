import { compare, hash } from "bcrypt";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { sign } from "jsonwebtoken";
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import Publicadora from "../models/Publicadora";
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

class LoginRequest {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
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
        @CurrentUser({ required: true }) email: string
    ) {

        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

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

    @Authorized("PUBLICADORA")
    @Put("/")
    async update(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ) {

        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        publicadora.cnpj = req.cnpj;
        publicadora.nome = req.nome;
        publicadora.senha = req.senha;

        await this.publicadoraRepository.update(publicadora.id, publicadora);

        return { "sucesso": true };
    }

    @Post("/signin")
    async signin(
        @Body({ validate: true }) req: LoginRequest
    ) {

        let admin = await this.publicadoraRepository.getByEmail(req.email);
        if (admin === null)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const match = await compare(req.senha, admin.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };

        const token = sign(admin.email, "supersecret");

        return { "token": token };
    }

    @Post("/signup")
    async insert(
        @Body({ validate: true }) req: InsertRequest
    ) {

        let publicadora = await this.publicadoraRepository.getByEmail(req.email);
        if (publicadora !== null)
            return { "erro": "EMAIL_EXISTENTE" };

        const hashSenha = await hash(req.senha, 1024);
        publicadora = new Publicadora(0, req.cnpj, req.nome, req.email, hashSenha);

        const insertId = await this.publicadoraRepository.add(publicadora);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };

        return { "sucesso": true };
    }

    @Authorized("PUBLICADORA")
    @Delete("/")
    async delete(
        @CurrentUser({ required: true }) email: string,
    ) {

        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        await this.publicadoraRepository.delete(publicadora.id);

        return { "sucesso": true };
    }
}