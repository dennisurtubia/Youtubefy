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
const MusicaAprovada_1 = __importDefault(require("../models/MusicaAprovada"));
const MusicaNaoAprovada_1 = __importDefault(require("../models/MusicaNaoAprovada"));
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const MusicaAprovadaRepository_1 = __importDefault(require("../repositories/MusicaAprovadaRepository"));
const MusicaNaoAprovadaRepository_1 = __importDefault(require("../repositories/MusicaNaoAprovadaRepository"));
const MusicaNaoAvaliadaRepository_1 = __importDefault(require("../repositories/MusicaNaoAvaliadaRepository"));
var Avaliacao;
(function (Avaliacao) {
    Avaliacao["Aprovado"] = "aprovado";
    Avaliacao["Reprovado"] = "reprovado";
})(Avaliacao || (Avaliacao = {}));
class AvaliarRequest {
    constructor() {
        this.musica = 0;
        this.avaliacao = Avaliacao.Reprovado;
    }
}
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], AvaliarRequest.prototype, "musica", void 0);
__decorate([
    class_validator_1.IsEnum(Avaliacao),
    __metadata("design:type", String)
], AvaliarRequest.prototype, "avaliacao", void 0);
// TODO:
/*
    Documentar
    Exluir, atualizar. CRUD simples

*/
let MusicaController = class MusicaController {
    /**
    *
    * @api {get} /musica/naoavaliadas Listar músicas não avaliadas
    * @apiName ListarMusicasNaoAvaliadas
    * @apiGroup Musica
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "naoAvaliadas": []
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    */
    async getNaoAvaliadas(email) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const musicas = await this.musicaNaoAvaliadaRepository.getAll();
        return {
            "naoAvaliadas": musicas.map((m) => m.id)
        };
    }
    /**
    *
    * @api {get} /musica/aprovadas Listar músicas aprovadas
    * @apiName ListarMusicasAprovadas
    * @apiGroup Musica
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "aprovadas": []
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   }
    */
    async getAprovadas(email) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        const musicas = await this.musicaAprovadaRepository.getAll();
        return {
            "aprovadas": musicas
        };
    }
    /**
    *
    * @api {post} /musica/avaliar Aprovar/Reprovar música
    * @apiName AvaliarMusica
    * @apiGroup Musica
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiParam  {number} id ID
    * @apiParam  {String} avaliacao "aprovado" | "reprovado"
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "id": "1",
    *       "avaliacao": "reprovado"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "MUSICA_INVALIDA"
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "MUSICA_ESTA_REPROVADA"
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "MUSICA_ESTA_APROVADA"
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
    async avaliar(email, req) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };
        let musica = await this.musicaNaoAvaliadaRepository.getById(req.musica);
        if (musica === null) {
            musica = await this.musicaAprovadaRepository.getById(req.musica);
            if (musica === null) {
                musica = await this.musicaNaoAprovadaRepository.getById(req.musica);
                if (musica === null)
                    return { "erro": "MUSICA_INVALIDA" };
                if (req.avaliacao === Avaliacao.Aprovado) {
                    await this.musicaNaoAprovadaRepository.delete(musica.id);
                    await this.musicaAprovadaRepository.add(new MusicaAprovada_1.default(musica.id, musica.nome, musica.duracao, musica.explicito));
                }
                else {
                    return { "erro": "MUSICA_ESTA_REPROVADA" };
                }
            }
            else {
                if (req.avaliacao === Avaliacao.Reprovado) {
                    await this.musicaAprovadaRepository.delete(musica.id);
                    await this.musicaNaoAprovadaRepository.add(new MusicaNaoAprovada_1.default(musica.id, musica.nome, musica.duracao, musica.explicito));
                }
                else {
                    return { "erro": "MUSICA_ESTA_APROVADA" };
                }
            }
        }
        else {
            await this.musicaNaoAvaliadaRepository.delete(musica.id);
            if (req.avaliacao === Avaliacao.Aprovado)
                await this.musicaAprovadaRepository.add(new MusicaAprovada_1.default(musica.id, musica.nome, musica.duracao, musica.explicito));
            else if (req.avaliacao === Avaliacao.Reprovado)
                await this.musicaNaoAprovadaRepository.add(new MusicaNaoAprovada_1.default(musica.id, musica.nome, musica.duracao, musica.explicito));
        }
        return { "sucesso": true };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdminRepository_1.default)
], MusicaController.prototype, "adminRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MusicaAprovadaRepository_1.default)
], MusicaController.prototype, "musicaAprovadaRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MusicaNaoAprovadaRepository_1.default)
], MusicaController.prototype, "musicaNaoAprovadaRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MusicaNaoAvaliadaRepository_1.default)
], MusicaController.prototype, "musicaNaoAvaliadaRepository", void 0);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/naoavaliadas"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicaController.prototype, "getNaoAvaliadas", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Get("/aprovadas"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicaController.prototype, "getAprovadas", null);
__decorate([
    routing_controllers_1.Authorized("ADMIN"),
    routing_controllers_1.Post("/avaliar"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AvaliarRequest]),
    __metadata("design:returntype", Promise)
], MusicaController.prototype, "avaliar", null);
MusicaController = __decorate([
    routing_controllers_1.JsonController("/musica")
], MusicaController);
exports.default = MusicaController;
//# sourceMappingURL=MusicaController.js.map