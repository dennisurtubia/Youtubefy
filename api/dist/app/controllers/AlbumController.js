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
const Album_1 = __importDefault(require("../models/Album"));
const MusicaNaoAvaliada_1 = __importDefault(require("../models/MusicaNaoAvaliada"));
const AlbumRepository_1 = __importDefault(require("../repositories/AlbumRepository"));
const GeneroRepository_1 = __importDefault(require("../repositories/GeneroRepository"));
const MusicaNaoAvaliadaRepository_1 = __importDefault(require("../repositories/MusicaNaoAvaliadaRepository"));
const PublicadoraRepository_1 = __importDefault(require("../repositories/PublicadoraRepository"));
class InsertMusica {
    constructor() {
        this.nome = "";
        this.duracao = 0;
        this.explicto = false;
        this.genero = 0;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertMusica.prototype, "nome", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], InsertMusica.prototype, "duracao", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], InsertMusica.prototype, "explicto", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], InsertMusica.prototype, "genero", void 0);
class InsertRequest {
    constructor() {
        this.capa = "";
        this.nome = "";
        this.nomeArtista = "";
        this.descricao = "";
        this.idPublicadora = 0;
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], InsertRequest.prototype, "capa", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "nome", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], InsertRequest.prototype, "nomeArtista", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], InsertRequest.prototype, "descricao", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], InsertRequest.prototype, "idPublicadora", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", Array)
], InsertRequest.prototype, "musicas", void 0);
let AlbumController = class AlbumController {
    /**
    *
    * @api {post} /album Submeter album
    * @apiName SubmitAlbum
    * @apiGroup Album
    *
    * @apiHeader {String} token Token da Publicadora (por enquanto é o id)
    * @apiParam  {String} capa URL da capa
    * @apiParam  {String} nome Nome
    * @apiParam  {String} nomeArtista Nome do artista
    * @apiParam  {String} descricao Descrição
    * @apiParam  {Number} idPublicadora Id da publicadora
    * @apiParam  {object[]} musicas Musicas
    * @apiHeaderExample {json} Exemplo Header:
    *   {
    *       "token": "1234"
    *   }
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "capa": "https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg",
    *       "nome": "Nome do álbum",
    *       "nomeArtista": "xxxtentacion",
    *       "descricao": "Album legal",
    *       "idPublicadora": 1,
    *       "musicas":
    *           [
    *               {
    *                   "nome": "Música 1",
    *                   "duracao": 240,
    *                   "explicito": true,
    *                   "genero": 1
    *               },
    *               {
    *                   "nome": "Música 2",
    *                   "duracao": 230,
    *                   "explicito": false,
    *                   "genero": 2
    *               }
    *           ]
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "musicasAdicionadas": [1],
    *       "musicasNaoAdicionadas": [24]
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *       "erro": "TOKEN_INVALIDO"
    *   }
    *
    */
    async submitAlbum(token, req) {
        if (!util_1.isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        const publicadora = await this.publicadoraRepository.getById(Number.parseInt(token));
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        const album = new Album_1.default(0, req.capa, req.nome, req.nomeArtista, req.descricao, publicadora.id);
        album.id = await this.albumRepository.add(album);
        let musicasAdicionadas = [];
        let musicasNaoAdicionadas = [];
        for (let it of req.musicas) {
            let genero = await this.generoRepository.getById(it.genero);
            if (genero !== null) {
                const musica = new MusicaNaoAvaliada_1.default(0, it.nome, it.duracao, it.explicto);
                musica.idAlbum = album.id;
                musica.idGenero = genero.id;
                musica.id = await this.musicaNaoAvaliadaRepository.add(musica);
                musicasAdicionadas.push(it.nome);
            }
            else {
                musicasNaoAdicionadas.push(it.nome);
            }
        }
        return {
            "musicasAdicionadas": musicasAdicionadas,
            "musicasNaoAdicionadas": musicasNaoAdicionadas
        };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AlbumRepository_1.default)
], AlbumController.prototype, "albumRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", PublicadoraRepository_1.default)
], AlbumController.prototype, "publicadoraRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", GeneroRepository_1.default)
], AlbumController.prototype, "generoRepository", void 0);
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", MusicaNaoAvaliadaRepository_1.default)
], AlbumController.prototype, "musicaNaoAvaliadaRepository", void 0);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "submitAlbum", null);
AlbumController = __decorate([
    routing_controllers_1.JsonController("/album")
], AlbumController);
exports.default = AlbumController;
//# sourceMappingURL=AlbumController.js.map