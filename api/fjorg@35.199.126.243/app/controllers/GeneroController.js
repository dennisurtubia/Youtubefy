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
const Genero_1 = __importDefault(require("../models/Genero"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const GeneroRepository_1 = __importDefault(require("../repositories/GeneroRepository"));
const MusicaAprovadaRepository_1 = __importDefault(require("../repositories/MusicaAprovadaRepository"));
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
let GeneroController = class GeneroController {
    // ------------------------------------------------------ CRUD ------------------------------------------------------
    /**
    *
    * @api {get} /genero/:id Informações do gênero
    * @apiName InfoGenero
    * @apiGroup Genero
    *
    * @apiParam  {String} token Json Web Token
    * @apiParam  {number} id ID
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero/4?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": 1,
    *       "nome": "Ação"
    *   }
    * @apiErrorExample {json} ID gênero inválido:
    *   {
    *       "erro": "ID_INVALIDO"
    *   }
    * @apiErrorExample {json} Admin inváludo:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    * @apiErrorExample {json} Gênero inváludo:
    *   {
    *       "erro": "GENERO_INVALIDO"
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   }
    */
    async get(email, id) {
        if (!util_1.isNumber(id))
            return { "erro": "ID_INVALIDO" };
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const genero = await this.generoRepository.getById(id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };
        return {
            "id": genero.id,
            "nome": genero.nome
        };
    }
    /**
    *
    * @api {get} /genero Listar todos os gêneros
    * @apiName ListarGeneros
    * @apiGroup Genero
    *
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "generos":
    *           [
    *               {
    *                   "id": 1,
    *                   "nome": "Ação"
    *               },
    *               {
    *                   "id": 2,
    *                   "nome": "Aventura"
    *               }
    *           ]
    *   }
    */
    async getAll() {
        const generos = await this.generoRepository.getAll();
        return { "generos": generos.map((_a) => {
                var { idAdministrador } = _a, attrs = __rest(_a, ["idAdministrador"]);
                return attrs;
            }) };
    }
    /**
    *
    * @api {post} /genero Inserir gênero
    * @apiName InserirGenero
    * @apiGroup Genero
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero?token=deadbeef
    * @apiParam  {String} nome Nome
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "nome": "Ação"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    * @apiErrorExample {json} Nome inválido:
    *   {
    *       "erro": "NOME_INVALIDO"
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
    async insert(email, nome) {
        if (!util_1.isString(nome) || nome.length <= 0)
            return { "erro": "NOME_INVALIDO" };
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const genero = new Genero_1.default(0, nome, admin.id);
        await this.generoRepository.add(genero);
        return { "sucesso": true };
    }
    /**
    *
    * @api {put} /genero Atualizar gênero
    * @apiName AtualizarGenero
    * @apiGroup Genero
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero?token=deadbeef
    * @apiParam  {number} id ID
    * @apiParam  {String} nome Novo nome
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "id": 1,
    *       "nome": "Novo nome"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "GENERO_INVALIDO"
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
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const genero = await this.generoRepository.getById(req.id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };
        genero.nome = req.nome;
        await this.generoRepository.update(req.id, genero);
        return { "sucesso": true };
    }
    /**
    *
    * @api {delete} /genero Remover gênero
    * @apiName RemoverGenero
    * @apiGroup Genero
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/genero?token=deadbeef
    * @apiParam  {number} id ID
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} ID inválido:
    *   {
    *       "erro": "ID_INVALIDO"
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    * @apiErrorExample {json} Gênero inválido:
    *   {
    *       "erro": "GENERO_INVALIDO"
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   }
    */
    async delete(email, id) {
        if (!util_1.isNumber(id))
            return { "erro": "ID_INVALIDO" };
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const genero = await this.generoRepository.getById(id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };
        await this.generoRepository.delete(id);
        return { "sucesso": true };
    }
    // ------------------------------------------------------ 1:N ------------------------------------------------------
    // listar musicas do gênero
    async getMusicas(id) {
        const genero = await this.generoRepository.getById(id);
        if (genero === null)
            return { "erro": "GENERO_INVALIDO" };
        const musicas = await this.musicaAprovadaRepository.getByGenero(genero.id);
        return { "musicas": musicas };
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
    typedi_1.Inject(),
    __metadata("design:type", MusicaAprovadaRepository_1.default)
], GeneroController.prototype, "musicaAprovadaRepository", void 0);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "get", null);
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.BodyParam("nome")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "insert", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateRequest]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "update", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.BodyParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "delete", null);
__decorate([
    routing_controllers_1.Get("/:id/musicas"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GeneroController.prototype, "getMusicas", null);
GeneroController = __decorate([
    routing_controllers_1.JsonController("/genero")
], GeneroController);
exports.default = GeneroController;
//# sourceMappingURL=GeneroController.js.map