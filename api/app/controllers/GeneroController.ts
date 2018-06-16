import { BodyParam, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import GeneroRepository from "../repositories/GeneroRepository";

// Trabalhando com json
// Prefixo da api: /genero
@JsonController("/genero")
export default class GeneroController {

    // Injeta a dependência para o repositório do Genero
    // Se quiser estudar sobre dependency injection: https://stackoverflow.com/questions/130794/what-is-dependency-injection
    @Inject()
    private generoRepository!: GeneroRepository;

    // Retorna todos os gêneros
    // Recebe o token do administrador dos headers (usando dependency injection do Typescript)
    @Get("/")
    async getAll(@HeaderParam("token") token: string) {

        // Todo [jorge]: transferir validação do token para um middleware

        // Verifica se o token é uma string e se não está vazia
        // Isso não tem nenhuma segurança, mas por enquanto não tem problema
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        // Chama o generoRepository.getAll();
        return this.generoRepository.getAll();
    }

    // Insere um genero
    // Recebe o token pelos headers e o nome do genero pelo body
    @Post("/")
    async insertOne(@HeaderParam("token") token: string, @BodyParam("nome") nome: string) {

        // Mesma coisa de cima
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        if (!isString(nome) || nome.length <= 0)
            return { "erro": "ERRO_BODY" };

        // Todo [jorge]: Por enquanto o token é apenas o id do administrador (tipo number)
        // Caso seja implementado autenticação futuramente, o token será uma string jwt
        // Será necessário futuramente:
        // 1. Validar jwt e extrair id do administrador

        return await this.generoRepository.insert(nome, Number.parseInt(token));
    }

    // Todo[jorge]: Update, Delete
}