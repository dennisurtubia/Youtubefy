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
const Genero_1 = __importDefault(require("../models/Genero"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const GeneroRepository_1 = __importDefault(require("../repositories/GeneroRepository"));
let GeneroController = class GeneroController {
    async getAll(token) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        return this.generoRepository.getAll();
    }
    async insertOne(token, nome) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isString(nome) || nome.length <= 0)
            return { "erro": "ERRO_BODY" };
        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const genero = new Genero_1.default(0, nome);
        genero.administrador = admin;
        return await this.generoRepository.add(genero);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", GeneroRepository_1.default)
], GeneroController.prototype, "generoRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdminRepository_1.default)
], GeneroController.prototype, "adminRepository", void 0);
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