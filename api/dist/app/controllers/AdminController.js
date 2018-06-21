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
const Administrador_1 = __importDefault(require("../models/Administrador"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
// TODO:
/*
    Listar gêneros administrados pelo admin. 1:n
    Listar playlists administradas pelo admin. 1:n
    Listar músicas avaliadas pelo admin. 1:n
*/
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
let AdminController = class AdminController {
    /**
    *
    * @api {get} /admin Informações do administrador
    * @apiName InfoAdmin
    * @apiGroup Admin
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "1",
    *       "nome": "Doravante",
    *       "email": "a@a.com",
    *       "cpf": "11111111111"
    *   }
    * @apiErrorExample {json} Admin inválido:
    *   {
    *        "erro": "ADMIN_INVALIDO"
    *   }
    *
    */
    async get(email) {
        const admin = await this.adminRepository.getByEmail(email);
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
    // FAZ SENTIDO TER ESSA FUNÇÃO?
    // /*
    // * 
    // * api_ {get} /admin Listar todos os administradores
    // * @apiName ListarAdmins
    // * @apiGroup Admin
    // * 
    // * @apiHeader {String} token Token do Administrador (por enquanto é o id)
    // * @apiHeaderExample {json} Exemplo Header:
    // *   { 
    // *       "token": "1234"  
    // *   }
    // * @apiSuccessExample {json} Resposta bem sucessida:
    // *   {
    // *       "admins": 
    // *       [
    // *           {
    // *               "id": "1",
    // *               "nome": "Doravante",
    // *               "email": "a@a.com",
    // *               "cpf": "11111111111"
    // *           },
    // *           {
    // *               "id": "2",
    // *               "nome": "Sebastião",
    // *               "email": "b@a.com",
    // *               "cpf": "11111111111"
    // *           }
    // *       ]
    // *   }
    // * @apiErrorExample {json} Resposta com erro:
    // *   {
    // *       "erro": "TOKEN_INVALIDO"
    // *   } 
    // *
    // */
    // @Get("/")
    // async getAll(
    //     @HeaderParam("token") token: string
    // ) {
    //     if (!isString(token) || token.length <= 0)
    //         return { "erro": "TOKEN_INVALIDO" };
    //     const admins = await this.adminRepository.getAll();
    //     return { "admins": admins.map(({ senha, ...attrs }) => attrs) };
    // }
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
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ERRO_BD"
    *   }
    */
    async insert(req) {
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
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "INFORMACOES_INCORRETAS"
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
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *        "erro": "ADMIN_INVALIDO"
    *   }
    *
    */
    async update(email, req) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        admin.nome = req.nome;
        admin.email = req.email;
        admin.senha = await bcrypt_1.hash(req.senha, 1024);
        admin.cpf = req.cpf;
        await this.adminRepository.update(admin.id, admin);
        return { "sucesso": true };
    }
    /**
    *
    * @api {delete} /admin Remover administrador
    * @apiName RemoverAdmin
    * @apiGroup Admin
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
    *        "erro": "ADMIN_INVALIDO"
    *   }
    *
    */
    async delete(email) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        await this.adminRepository.delete(admin.id);
        return { "sucesso": true };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdminRepository_1.default)
], AdminController.prototype, "adminRepository", void 0);
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
], AdminController.prototype, "insert", null);
__decorate([
    routing_controllers_1.Post("/signin"),
    __param(0, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signin", null);
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
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "delete", null);
AdminController = __decorate([
    routing_controllers_1.JsonController("/admin")
], AdminController);
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map