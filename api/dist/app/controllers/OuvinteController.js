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
const bcrypt_1 = require("bcrypt");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const Ouvinte_1 = __importDefault(require("../models/Ouvinte"));
const OuvinteRepository_1 = __importDefault(require("../repositories/OuvinteRepository"));
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
class LoginRequest {
    constructor() {
        this.email = "";
        this.senha = "";
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], LoginRequest.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginRequest.prototype, "senha", void 0);
let OuvinteController = class OuvinteController {
    // ------------------------------------------------------ CRUD ------------------------------------------------------
    /**
    *
    * @api {get} /ouvinte Informações do ouvinte
    * @apiName InfoOuvinte
    * @apiGroup Ouvinte
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/ouvinte?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cpf": "11111111111",
    *       "tipoUser": 1
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *        "erro": "OUVINTE_INVALIDO"
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   }
    */
    async get(email) {
        const ouvinte = await this.ouvinteRepository.getByEmail(email);
        if (ouvinte === null)
            return { "erro": "OUVINTE_INVALIDO" };
        return {
            "id": ouvinte.id,
            "nome": ouvinte.nome,
            "email": ouvinte.email,
            "cpf": ouvinte.cpf,
            "tipoUser": 1
        };
    }
    /**
    *
    * @api {post} /ouvinte/signup Cadastrar ouvinte
    * @apiName CadastrarOuvinte
    * @apiGroup Ouvinte
    *
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cpf CPF
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
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "EMAIL_EXISTENTE"
    *   }
    * @apiErrorExample {json} Erro BD:
    *   {
    *       "erro": "ERRO_BD"
    *   }
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }
    */
    async signup(req) {
        let ouvinte = await this.ouvinteRepository.getByEmail(req.email);
        if (ouvinte !== null)
            return { "erro": "EMAIL_EXISTENTE" };
        const hashSenha = await bcrypt_1.hash(req.senha, 1024);
        ouvinte = new Ouvinte_1.default(0, req.cpf, req.nome, req.email, hashSenha);
        const insertId = await this.ouvinteRepository.add(ouvinte);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };
        return { "sucesso": true };
    }
    /**
    *
    * @api {put} /ouvinte Atualizar ouvinte
    * @apiName AtualizarOuvinte
    * @apiGroup Ouvinte
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiParam  {String} nome Novo nome
    * @apiParam  {String} email Novo email
    * @apiParam  {String} senha Nova senha
    * @apiParam  {String} cpf Novo CPF
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
    *        "erro": "OUVINTE_INVALIDO"
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   }
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }
    */
    async update(email, req) {
        const ouvinte = await this.ouvinteRepository.getByEmail(email);
        if (ouvinte === null)
            return { "erro": "ADMIN_INVALIDO" };
        ouvinte.nome = req.nome;
        ouvinte.email = req.email;
        ouvinte.senha = await bcrypt_1.hash(req.senha, 1024);
        ouvinte.cpf = req.cpf;
        await this.ouvinteRepository.update(ouvinte.id, ouvinte);
        return { "sucesso": true };
    }
    // ------------------------------------------------------ REGRAS DE NEGOCIO ------------------------------------------------------
    /**
    *
    * @api {post} /ouvinte/signin Login ouvinte
    * @apiName LoginOuvinte
    * @apiGroup Ouvinte
    *
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "email": "a@a.com",
    *       "senha": "9876"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "token": "deadbeef"
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "INFORMACOES_INCORRETAS"
    *   }
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }
    */
    async signin(req) {
        let ouvinte = await this.ouvinteRepository.getByEmail(req.email);
        if (ouvinte === null)
            return { "erro": "INFORMACOES_INCORRETAS" };
        const match = await bcrypt_1.compare(req.senha, ouvinte.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };
        const token = jsonwebtoken_1.sign(ouvinte.email, "supersecret");
        return { "token": token };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", OuvinteRepository_1.default)
], OuvinteController.prototype, "ouvinteRepository", void 0);
__decorate([
    routing_controllers_1.Authorized("OUVINTE"),
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "get", null);
__decorate([
    routing_controllers_1.Post("/signup"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InsertRequest]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "signup", null);
__decorate([
    routing_controllers_1.Authorized("OUVINTE"),
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "update", null);
__decorate([
    routing_controllers_1.Post("/signin"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest]),
    __metadata("design:returntype", Promise)
], OuvinteController.prototype, "signin", null);
OuvinteController = __decorate([
    routing_controllers_1.JsonController("/ouvinte")
], OuvinteController);
exports.default = OuvinteController;
//# sourceMappingURL=OuvinteController.js.map