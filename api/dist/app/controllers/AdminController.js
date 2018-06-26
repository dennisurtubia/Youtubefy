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
const Administrador_1 = __importDefault(require("../models/Administrador"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const GeneroRepository_1 = __importDefault(require("../repositories/GeneroRepository"));
const MusicaAprovadaRepository_1 = __importDefault(require("../repositories/MusicaAprovadaRepository"));
const MusicaNaoAprovadaRepository_1 = __importDefault(require("../repositories/MusicaNaoAprovadaRepository"));
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
    class_validator_1.Length(11, 11),
    __metadata("design:type", String)
], InsertRequest.prototype, "cpf", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "nome", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail(),
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
let AdminController = class AdminController {
    // ------------------------------------------------------ CRUD ------------------------------------------------------
    /**
    *
    * @api {get} /admin Informações do administrador
    * @apiName InfoAdmin
    * @apiGroup Admin
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cpf": "11111111111",
    *       "tipoUser": 3
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   }
    *
    */
    async get(email) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        return {
            "id": admin.id,
            "nome": admin.nome,
            "email": admin.email,
            "cpf": admin.cpf,
            "tipoUser": 3
        };
    }
    /**
    *
    * @api {post} /admin/signup Cadastrar administrador
    * @apiName CadastrarAdmin
    * @apiGroup Admin
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
        let admin = await this.adminRepository.getByEmail(req.email);
        if (admin !== null)
            return { "erro": "EMAIL_EXISTENTE" };
        const hashSenha = await bcrypt_1.hash(req.senha, 1024);
        admin = new Administrador_1.default(0, req.cpf, req.nome, req.email, hashSenha);
        const insertId = await this.adminRepository.add(admin);
        if (insertId === -1)
            return { "erro": "ERRO_BD" };
        return { "sucesso": true };
    }
    /**
    *
    * @api {put} /admin Atualizar administrador
    * @apiName AtualizarAdmin
    * @apiGroup Admin
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
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return;
        admin.nome = req.nome;
        admin.email = req.email;
        admin.senha = await bcrypt_1.hash(req.senha, 1024);
        admin.cpf = req.cpf;
        await this.adminRepository.update(admin.id, admin);
        return { "sucesso": true };
    }
    // ------------------------------------------------------ REGRAS DE NEGÓCIO ------------------------------------------------------
    /**
    *
    * @api {post} /admin/signin Login administrador
    * @apiName LoginAdmin
    * @apiGroup Admin
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
    * @apiErrorExample {json} Email/senha incorretos:
    *   {
    *       "erro": "INFORMACOES_INCORRETAS"
    *   }
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }
    */
    async signin(req) {
        let admin = await this.adminRepository.getByEmail(req.email);
        if (admin === null)
            return { "erro": "INFORMACOES_INCORRETAS" };
        const match = await bcrypt_1.compare(req.senha, admin.senha);
        if (!match)
            return { "erro": "INFORMACOES_INCORRETAS" };
        const token = jsonwebtoken_1.sign(admin.email, "supersecret");
        return { "token": token };
    }
    // ------------------------------------------------------ 1:N ------------------------------------------------------
    async generosAdministrados(email) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return;
        const generos = await this.generoRepository.getByAdmin(admin.id);
        return { "generos": generos.map((_a) => {
                var { idAdministrador } = _a, attrs = __rest(_a, ["idAdministrador"]);
                return attrs;
            }) };
    }
    async musicasAvaliadas(email) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return;
        const aprovadas = await this.musicaAprovadaRepository.getByAdmin(admin.id);
        const reprovadas = await this.musicaNaoAprovadaRepository.getByAdmin(admin.id);
        return {
            "aprovadas": aprovadas,
            "reprovadas": reprovadas
        };
    }
    async playlistsPublicas(email) {
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdminRepository_1.default)
], AdminController.prototype, "adminRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", GeneroRepository_1.default)
], AdminController.prototype, "generoRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MusicaAprovadaRepository_1.default)
], AdminController.prototype, "musicaAprovadaRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MusicaNaoAprovadaRepository_1.default)
], AdminController.prototype, "musicaNaoAprovadaRepository", void 0);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get", null);
__decorate([
    routing_controllers_1.Post("/signup"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InsertRequest]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signup", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    routing_controllers_1.Post("/signin"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/generos"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "generosAdministrados", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/musicas-avaliadas"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "musicasAvaliadas", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/playlists-publicas"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "playlistsPublicas", null);
AdminController = __decorate([
    routing_controllers_1.JsonController("/admin")
], AdminController);
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map