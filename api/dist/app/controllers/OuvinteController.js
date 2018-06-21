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
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const util_1 = require("util");
const Ouvinte_1 = __importDefault(require("../models/Ouvinte"));
const OuvinteRepository_1 = __importDefault(require("../repositories/OuvinteRepository"));
class UpdateRequest {
    constructor() {
        this.id = 0;
        this.nome = "";
    }
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateRequest.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRequest.prototype, "nome", void 0);
class InsertRequest {
    constructor() {
        this.cpf = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "cpf", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "nome", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "senha", void 0);
// TODO: 
/*
    Adicionar jwt
    Documentar
    Listar, adicionar, remover músicas. n:n
    Listar, adicionar, remover playlists privadas. n:n
    Listar, seguir, deixar de seguir playlists públicas. n:n
*/
let OuvinteController = class OuvinteController {
    async getAll(token) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        return { "ouvintes": await this.ouvinteRepository.getAll() };
    }
    async getById(token, id) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isNumber(id))
            return { "erro": "ID_INVALIDO" };
        const ouvinte = await this.ouvinteRepository.getById(id);
        if (ouvinte === null)
            return { "erro": "OUVINTE_INVALIDO" };
        return {
            "ouvinte": {
                "id": ouvinte.id,
                "nome": ouvinte.nome,
                "email": ouvinte.email,
                "cpf": ouvinte.cpf
            }
        };
    }
    async insertOne(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const ouvinte = new Ouvinte_1.default(0, req.cpf, req.nome, req.email, req.senha);
        await this.ouvinteRepository.add(ouvinte);
        return { "sucesso": true };
    }
    async update(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const ouvinte = await this.ouvinteRepository.getById(req.id);
        if (ouvinte === null)
            return { "erro": "OUVINTE_INVALIDO" };
        await this.ouvinteRepository.update(req.id, ouvinte);
        return { "sucesso": true };
    }
    async delete(token, id) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isNumber(token))
            return { "erro": "ID_INVALIDO" };
        const ouvinte = await this.ouvinteRepository.getById(id);
        if (ouvinte === null)
            return { "erro": "OUVINTE_INVALIDO" };
        await this.ouvinteRepository.delete(id);
        return { "sucesso": true };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", OuvinteRepository_1.default)
], OuvinteController.prototype, "ouvinteRepository", void 0);
__decorate([
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "getById", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "insertOne", null);
__decorate([
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRequest]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "update", null);
__decorate([
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.BodyParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "delete", null);
OuvinteController = __decorate([
    routing_controllers_1.JsonController("/ouvinte")
], OuvinteController);
exports.default = OuvinteController;
//# sourceMappingURL=OuvinteController.js.map