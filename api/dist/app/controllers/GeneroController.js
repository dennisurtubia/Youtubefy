"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const util_1 = require("util");
const GeneroRepository_1 = __importDefault(require("../repositories/GeneroRepository"));
// Trabalhando com json
// Prefixo da api: /genero
let GeneroController = class GeneroController {
    // Retorna todos os gêneros
    // Recebe o token do administrador dos headers (usando dependency injection do Typescript)
    async getAll(token) {
        // Todo [jorge]: transferir validação do token para um middleware
        // Verifica se o token é uma string e se não está vazia
        // Isso não tem nenhuma segurança, mas por enquanto não tem problema
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        // Chama o generoRepository.getAll();
        return this.generoRepository.getAll();
    }
    // Insere um genero
    // Recebe o token pelos headers e o nome do genero pelo body
    async insertOne(token, nome) {
        // Mesma coisa de cima
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isString(nome) || nome.length <= 0)
            return { "erro": "ERRO_BODY" };
        // Todo [jorge]: Por enquanto o token é apenas o id do administrador (tipo number)
        // Caso seja implementado autenticação futuramente, o token será uma string jwt
        // Será necessário futuramente:
        // 1. Validar jwt e extrair id do administrador
        return await this.generoRepository.insert(nome, Number.parseInt(token));
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", GeneroRepository_1.default)
], GeneroController.prototype, "generoRepository", void 0);
__decorate([
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.HeaderParam("token")), __param(1, routing_controllers_1.BodyParam("nome")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "insertOne", null);
GeneroController = __decorate([
    routing_controllers_1.JsonController("/genero")
], GeneroController);
exports.default = GeneroController;
//# sourceMappingURL=GeneroController.js.map