import { BodyParam, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import Genero from "../models/Genero";
import AdminRepository from "../repositories/AdminRepository";
import GeneroRepository from "../repositories/GeneroRepository";

@JsonController("/genero")
export default class GeneroController {

    @Inject()
    private generoRepository!: GeneroRepository;

    @Inject()
    private adminRepository!: AdminRepository;


    @Get("/")
    async getAll(@HeaderParam("token") token: string) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        return this.generoRepository.getAll();
    }

    @Post("/")
    async insertOne(@HeaderParam("token") token: string, @BodyParam("nome") nome: string) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isString(nome) || nome.length <= 0)
            return { "erro": "ERRO_BODY" };

        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const genero = new Genero(0, nome);
        genero.administrador = admin;
        return await this.generoRepository.add(genero);
    }
}
// jwt 