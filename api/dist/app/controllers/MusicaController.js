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
const MusicaAprovada_1 = __importDefault(require("../models/MusicaAprovada"));
const MusicaNaoAprovada_1 = __importDefault(require("../models/MusicaNaoAprovada"));
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
let MusicaController = class MusicaController {
    async getNaoAvaliadas(token) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        return {
            "naoAvaliadas": await this.musicaNaoAvaliadaRepository.getAll()
        };
    }
    async avaliar(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const musica = await this.musicaNaoAvaliadaRepository.getById(req.musica);
        if (musica === null)
            return { "erro": "MUSICA_INVALIDA" };
        await this.musicaNaoAvaliadaRepository.delete(musica.id);
        if (req.avaliacao == Avaliacao.Aprovado) {
            const musicaAprovada = new MusicaAprovada_1.default(musica.id, musica.nome, musica.duracao, musica.explicito);
            await this.musicaAprovadaRepository.add(musicaAprovada);
        }
        else {
            const musicaNaoAprovada = new MusicaNaoAprovada_1.default(musica.id, musica.nome, musica.duracao, musica.explicito);
            await this.musicaNaoAprovadaRepository.add(musicaNaoAprovada);
        }
        return { "sucesso": true };
    }
};
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
    routing_controllers_1.Get("/nao-avaliadas"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MusicaController.prototype, "getNaoAvaliadas", null);
__decorate([
    routing_controllers_1.Post("/avaliar"),
    __param(0, routing_controllers_1.HeaderParam("token")),
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