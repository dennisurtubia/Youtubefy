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
const bcrypt_1 = require("bcrypt");
const class_validator_1 = require("class-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const Publicadora_1 = __importDefault(require("../models/Publicadora"));
const AlbumRepository_1 = __importDefault(require("../repositories/AlbumRepository"));
const PublicadoraRepository_1 = __importDefault(require("../repositories/PublicadoraRepository"));
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
let PublicadoraController = class PublicadoraController {
    // ------------------------------------------------------ CRUD ------------------------------------------------------
    /**
    *
    * @api {get} /publicadora Lista de Publicadoras
    * @apiName ListaPublicadora
    * @apiGroup Publicadora
    *
    * @apiSuccessExample {json} Resposta bem sucessida:
    * {
    *   "publicadoras": [
    *       {
    *           "id": 86,
    *           "nome": "admin"
    *       }
    *   ]
    * }
    *
    */
    async getAll() {
        const publicadoras = await this.publicadoraRepository.getAll();
        return {
            "publicadoras": publicadoras.map((_a) => {
                var { cnpj, email, senha } = _a, params = __rest(_a, ["cnpj", "email", "senha"]);
                return params;
            })
        };
    }
    /**
    *
    * @api {get} /publicadora/info Informações da publicadora
    * @apiName InfoPublicadora
    * @apiGroup Publicadora
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/publicadora/info?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cnpj": "11111111111",
            "tipoUser": 2
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *        "erro": "PUBLICADORA_INVALIDA"
    *   }
    *
    */
    async get(email) {
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        return {
            "id": publicadora.id,
            "nome": publicadora.nome,
            "email": publicadora.email,
            "cnpj": publicadora.cnpj,
            "tipoUser": 2
        };
    }
    /**
    *
    * @api {post} /publicadora/signup Cadastrar publicadora
    * @apiName CadastrarPublicadora
    * @apiGroup Publicadora
    *
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cnpj CNPJ
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cnpj": "11111111111"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "EMAIL_EXISTENTE"
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ERRO_BD"
    *   }
    */
    async signup(req) {
        let publicadora = await this.publicadoraRepository.getByEmail(req.email);
        if (publicadora !== null)
            return { "erro": "EMAIL_EXISTENTE" };
        const hashSenha = await bcrypt_1.hash(req.senha, 1024);
        publicadora = new Publicadora_1.default(0, req.cnpj, req.nome, req.email, hashSenha);
        const insertId = await this.publicadoraRepository.add(publicadora);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };
        return { "sucesso": true };
    }
    /**
    *
    * @api {put} /publicadora/update Atualizar dados publicadora
    * @apiName AtualizarPublicadora
    * @apiGroup Publicadora
    *
    * @apiParam  {String} nome Nome
    * @apiParam  {String} email Email
    * @apiParam  {String} senha Senha
    * @apiParam  {String} cnpj CNPJ
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "senha": "9876",
    *       "cnpj": "11111111111"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Publicadora inválida
    *   {
    *       "erro": "PUBLICADORA_INVALIDA"
    *   }
    * @apiErrorExample {json} Erro BD:
    *   {
    *       "erro": "ERRO_BD"
    *   }
    */
    async update(email, req) {
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        publicadora.cnpj = req.cnpj;
        publicadora.nome = req.nome;
        publicadora.senha = req.senha;
        await this.publicadoraRepository.update(publicadora.id, publicadora);
        return { "sucesso": true };
    }
    // ------------------------------------------------------ REGRAS DE NEGÓCIO ------------------------------------------------------
    /**
    *
    * @api {post} /publicadora/signin Login publicadora
    * @apiName LoginPublicadora
    * @apiGroup Publicadora
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
    */
    async signin(req) {
        let admin = await this.publicadoraRepository.getByEmail(req.email);
        if (admin === null)
            return { "erro": "INFORMACOES_INCORRETAS" };
        const match = await bcrypt_1.compare(req.senha, admin.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };
        const token = jsonwebtoken_1.sign(admin.email, "supersecret");
        return { "token": token };
    }
    // ------------------------------------------------------ 1:N ------------------------------------------------------
    /**
    *
    * @api {get} /publicadora/:id/albuns Albuns da publicadora
    * @apiName AlbunsPublicadora
    * @apiGroup Publicadora
    *
    * @apiParam  {number} id ID
    * @apiParamExample  {json} Request-Example:
    *    https://utfmusic.me/v1/publicadora/1/albuns
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cnpj": "11111111111",
            "tipoUser": 2
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *        "erro": "PUBLICADORA_INVALIDA"
    *   }
    *
    */
    async getAlbuns(id) {
        const publicadora = await this.publicadoraRepository.getById(id);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        const albuns = await this.albumRepository.getByPublicadora(id);
        return {
            "albuns": albuns
        };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", PublicadoraRepository_1.default)
], PublicadoraController.prototype, "publicadoraRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AlbumRepository_1.default)
], PublicadoraController.prototype, "albumRepository", void 0);
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Get("/info"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "get", null);
__decorate([
    routing_controllers_1.Post("/signup"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InsertRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "signup", null);
__decorate([
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "update", null);
__decorate([
    routing_controllers_1.Post("/signin"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "signin", null);
__decorate([
    routing_controllers_1.Get("/:id/albuns"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "getAlbuns", null);
PublicadoraController = __decorate([
    routing_controllers_1.JsonController("/publicadora")
], PublicadoraController);
exports.default = PublicadoraController;
//# sourceMappingURL=PublicadoraController.js.map