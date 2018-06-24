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
const Publicadora_1 = __importDefault(require("../models/Publicadora"));
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
// TODO:
/*
    Adicionar jwt
    Documentar
    Listar albuns da publicadora. 1:n

*/
let PublicadoraController = class PublicadoraController {
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
    async insert(req) {
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
* @api {get} /publicadora Informações da publicadora
* @apiName InfoPublicadora
* @apiGroup Publicadora
*
* @apiParam  {String} token Json Web Token
* @apiParamExample  {String} Request-Example:
*    https://utfmusic.me/v1/admin?token=deadbeef
* @apiSuccessExample {json} Resposta bem sucessida:
*   {
*       "id": "1",
*       "nome": "Doravante",
*       "email": "a@a.com",
*       "cnpj": "11111111111"
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
            "publicadora": {
                "id": publicadora.id,
                "nome": publicadora.nome,
                "email": publicadora.email,
                "cnpj": publicadora.cnpj
            }
        };
    }
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
    /**
*
* @api {delete} /publicadora Remover publicadora
* @apiName RemoverPublicadora
* @apiGroup Publicadora
*
* @apiParam  {String} token Json Web Token
* @apiParamExample  {String} Request-Example:
*    https://utfmusic.me/v1/admin?token=deadbeef
* @apiSuccessExample {json} Resposta bem sucessida:
*    {
*        "sucesso": true
*    }
* @apiErrorExample {json} Resposta com erro:
*   {
*        "erro": "PUBLICADORA_INVALIDA"
*   }
*
*/
    async delete(email) {
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        await this.publicadoraRepository.delete(publicadora.id);
        return { "sucesso": true };
    }
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
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", PublicadoraRepository_1.default)
], PublicadoraController.prototype, "publicadoraRepository", void 0);
__decorate([
    routing_controllers_1.Post("/signup"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [InsertRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "insert", null);
__decorate([
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "get", null);
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
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "delete", null);
__decorate([
    routing_controllers_1.Post("/signin"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest]),
    __metadata("design:returntype", Promise)
], PublicadoraController.prototype, "signin", null);
PublicadoraController = __decorate([
    routing_controllers_1.JsonController("/publicadora")
], PublicadoraController);
exports.default = PublicadoraController;
//# sourceMappingURL=PublicadoraController.js.map