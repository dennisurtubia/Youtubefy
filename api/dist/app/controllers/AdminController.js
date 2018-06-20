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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const util_1 = require("util");
const Administrador_1 = __importDefault(require("../models/Administrador"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
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
let AdminController = class AdminController {
    /**
    *
    * @api {get} /admin/:id Informações do administrador
    * @apiName InfoAdmin
    * @apiGroup Admin
    *
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiHeaderExample {json} Exemplo Header:
    *   {
    *       "token": "1234"
    *   }
    * @apiParam  {number} id ID
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "admin":
    *       {
    *           "id": "1",
    *           "nome": "Doravante",
    *           "email": "a@a.com",
    *           "cpf": "11111111111"
    *       }
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "TOKEN_INVALIDO"
    *   }
    *
    */
    async get(token, id) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isNumber(id))
            return { "erro": "ID_INVALIDO" };
        const admin = await this.adminRepository.getById(id);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        return {
            "admin": {
                "id": admin.id,
                "nome": admin.nome,
                "email": admin.email,
                "cpf": admin.cpf
            }
        };
    }
    /**
    *
    * @api {get} /admin Listar todos os administradores
    * @apiName ListarAdmins
    * @apiGroup Admin
    *
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiHeaderExample {json} Exemplo Header:
    *   {
    *       "token": "1234"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "admins":
    *       [
    *           {
    *               "id": "1",
    *               "nome": "Doravante",
    *               "email": "a@a.com",
    *               "cpf": "11111111111"
    *           },
    *           {
    *               "id": "2",
    *               "nome": "Sebastião",
    *               "email": "b@a.com",
    *               "cpf": "11111111111"
    *           }
    *       ]
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *       "erro": "TOKEN_INVALIDO"
    *   }
    *
    */
    async getAll(token) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const admins = await this.adminRepository.getAll();
        return { "admins": admins.map((_a) => {
                var { senha } = _a, attrs = __rest(_a, ["senha"]);
                return attrs;
            }) };
    }
    /**
    *
    * @api {post} /admin Inserir administrador
    * @apiName InserirAdmin
    * @apiGroup Admin
    *
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cpf CPF
    * @apiHeaderExample {json} Exemplo Header:
    *   {
    *       "token": "1234"
    *   }
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cpf": "11111111111"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *       "erro": "TOKEN_INVALIDO"
    *   }
    *
    */
    async insert(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const admin = new Administrador_1.default(0, req.cpf, req.nome, req.email, req.senha);
        await this.adminRepository.add(admin);
        return { "sucesso": true };
    }
    /**
    *
    * @api {put} /admin Atualizar administrador
    * @apiName AtualizarAdmin
    * @apiGroup Admin
    *
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {String} nome Novo nome
    * @apiParam  {String} email Novo email
    * @apiParam  {String} senha Nova senha
    * @apiParam  {String} cpf Novo CPF
    * @apiHeaderExample {json} Exemplo Header:
    *    {
    *       "token": "1234"
    *    }
    * @apiParamExample  {json} Exemplo:
    *    {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cpf": "11111111111"
    *    }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *    {
    *        "sucesso": true
    *    }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "GENERO_INVALIDO"
    *   }
    *
    */
    async update(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        admin.nome = req.nome;
        admin.email = req.email;
        admin.senha = req.senha;
        admin.cpf = req.cpf;
        await this.adminRepository.update(Number.parseInt(token), admin);
        return { "sucesso": true };
    }
    /**
    *
    * @api {delete} /admin Remover administrador
    * @apiName RemoverAdmin
    * @apiGroup Admin
    *
    * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    * @apiParam  {number} id ID
    * @apiHeaderExample {json} Exemplo Header:
    *    {
    *       "token": "1234"
    *    }
    * @apiParamExample  {json} Exemplo:
    *    {
    *        "id": 1
    *    }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *    {
    *        "sucesso": true
    *    }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "TOKEN_INVALIDO"
    *   }
    *
    */
    async delete(token, id) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        if (!util_1.isNumber(id))
            return { "erro": "ID_INVALIDO" };
        const admin = await this.adminRepository.getById(Number.parseInt(token));
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        await this.adminRepository.delete(id);
        return { "sucesso": true };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdminRepository_1.default)
], AdminController.prototype, "adminRepository", void 0);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get", null);
__decorate([
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "insert", null);
__decorate([
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.BodyParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "delete", null);
AdminController = __decorate([
    routing_controllers_1.JsonController("/admin")
], AdminController);
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map