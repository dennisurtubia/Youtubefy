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
const Publicadora_1 = __importDefault(require("../models/Publicadora"));
const PublicadoraRepository_1 = __importDefault(require("../repositories/PublicadoraRepository"));
class UpdateRequest {
    constructor() {
        this.cnpj = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.id = 0;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRequest.prototype, "cnpj", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRequest.prototype, "nome", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateRequest.prototype, "senha", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdateRequest.prototype, "id", void 0);
class InsertRequest {
    constructor() {
        this.cnpj = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "cnpj", void 0);
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
let PublicadoraController = class PublicadoraController {
    async getAll(token) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        return { "publicadoras": await this.publicadoraRepository.getAll() };
    }
    async insertOne(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const publicadora = new Publicadora_1.default(0, req.cnpj, req.nome, req.email, req.senha);
        await this.publicadoraRepository.add(publicadora);
        return { "sucesso": true };
    }
    async update(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const publicadora = await this.publicadoraRepository.getById(Number.parseInt(token));
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        publicadora.cnpj = req.cnpj;
        await this.publicadoraRepository.update(req.id, publicadora);
        return { "sucesso": true };
    }
    async delete(token, id) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isNumber(token))
            return { "erro": "ID_INVALIDO" };
        const publicadora = await this.publicadoraRepository.getById(Number.parseInt(token));
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        await this.publicadoraRepository.delete(id);
        return { "sucesso": true };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", PublicadoraRepository_1.default)
], PublicadoraController.prototype, "publicadoraRepository", void 0);
__decorate([
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "insertOne", null);
__decorate([
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "update", null);
__decorate([
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.BodyParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "delete", null);
PublicadoraController = __decorate([
    routing_controllers_1.JsonController("/publicadora")
], PublicadoraController);
exports.default = PublicadoraController;
//# sourceMappingURL=PublicadoraController.js.map