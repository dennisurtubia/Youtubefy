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
const Album_1 = __importDefault(require("../models/Album"));
const MusicaNaoAvaliada_1 = __importDefault(require("../models/MusicaNaoAvaliada"));
const AlbumRepository_1 = __importDefault(require("../repositories/AlbumRepository"));
const GeneroRepository_1 = __importDefault(require("../repositories/GeneroRepository"));
const MusicaAprovadaRepository_1 = __importDefault(require("../repositories/MusicaAprovadaRepository"));
const MusicaNaoAvaliadaRepository_1 = __importDefault(require("../repositories/MusicaNaoAvaliadaRepository"));
const PublicadoraRepository_1 = __importDefault(require("../repositories/PublicadoraRepository"));
const class_transformer_1 = require("class-transformer");
// TODO:
/*
    Listar, atualizar, CRUD simples
    Listar músicas do álbum. 1:n
*/
class InsertMusica {
    constructor() {
        this.nome = "";
        this.duracao = 0;
        this.explicito = false;
        this.url = "";
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
], InsertMusica.prototype, "explicito", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 300),
    __metadata("design:type", String)
], InsertMusica.prototype, "url", void 0);
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
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
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
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => InsertMusica),
    __metadata("design:type", Array)
], InsertRequest.prototype, "musicas", void 0);
let AlbumController = class AlbumController {
    // ------------------------------------------------------ CRUD ------------------------------------------------------
    /**
    *
    * @api {get} /album/ Todos os álbuns
    * @apiName ListarAlbum
    * @apiGroup Album
    * @apiParamExample  {json} Request-Example:
    *    {https://utfmusic.me/v1/album/}
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "albuns": [
    *           {
    *               "id": "5",
    *               "nome": "Album",
    *               "capa": "url capa",
    *               "nomeArtista": "rafa moreira",
    *               "descricao": "bro"
    *           },
    *           {
    *               "id": "6",
    *               "nome": "Album",
    *               "capa": "url capa",
    *               "nomeArtista": "rafa moreira",
    *               "descricao": "bro"
    *           }
    *       ]
    *   {
    *
    *   }
    *
    */
    async getAll() {
        const albums = await this.albumRepository.getAll();
        return {
            "albuns": albums
        };
    }
    /**
    *
    * @api {get} /album/:id Informações do album
    * @apiName InfoAlbum
    * @apiGroup Album
    * @apiParam  {number} id ID
    * @apiParamExample  {json} Request-Example:
    *    {https://utfmusic.me/v1/album/5}
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "5",
    *       "nome": "Album",
    *       "capa": "url capa",
    *       "nomeArtista": "rafa moreira",
    *       "descricao": "bro"
    *   }
    * @apiErrorExample {json} Album inválido:
    *   {
    *        "erro": "ALBUM_INVALIDO"
    *   }
    *
    */
    async get(id) {
        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };
        return {
            "id": album.id,
            "nome": album.nome,
            "capa": album.capa,
            "nomeArtista": album.nomeArtista,
            "descricao": album.descricao
        };
    }
    /**
    *
    * @api {post} /album Submeter album
    * @apiName SubmitAlbum
    * @apiGroup Album
    *
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/album?token=deadbeef
    * @apiParam  {String} capa URL da capa
    * @apiParam  {String} nome Nome
    * @apiParam  {String} nomeArtista Nome do artista
    * @apiParam  {String} descricao Descrição
    * @apiParam  {object[]} musicas Musicas
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "capa": "https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg",
    *       "nome": "Nome do álbum",
    *       "nomeArtista": "xxxtentacion",
    *       "descricao": "Album legal",
    *       "musicas":
    *           [
    *               {
    *                   "nome": "Música 1",
    *                   "duracao": 240,
    *                   "explicito": true,
    *                   "genero": 1,
    *                   "url": "url"
    *               },
    *               {
    *                   "nome": "Música 2",
    *                   "duracao": 230,
    *                   "explicito": false,
    *                   "genero": 2,
    *                   "url": "url"
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
    *       "erro": "PUBLICADORA_INVALIDA"
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
    async submitAlbum(email, req) {
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        const album = new Album_1.default(0, req.capa, req.nome, req.nomeArtista, req.descricao, publicadora.id);
        album.id = await this.albumRepository.add(album);
        let musicasAdicionadas = [];
        let musicasNaoAdicionadas = [];
        for (let it of req.musicas) {
            let genero = await this.generoRepository.getById(it.genero);
            if (genero !== null) {
                const musica = new MusicaNaoAvaliada_1.default(0, it.nome, it.duracao, it.explicito, it.url, genero.id, album.id);
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
    async update(id, req) {
        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };
        album.nome = req.nome;
        album.descricao = req.descricao;
        album.nomeArtista = req.nomeArtista;
        album.capa = req.capa;
        return { "sucesso": true };
    }
    async delete(email, id) {
        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };
        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };
        if (publicadora.id !== album.idPublicadora)
            return { "erro": "ACESSO_NEGADO" };
        await this.albumRepository.delete(id);
        return { "sucesso": true };
    }
    // ------------------------------------------------------ 1:N ------------------------------------------------------
    /**
    *
    * @api {get} /album/:id/musicas Músicas disponíveis do album
    * @apiName MusicasAlbum
    * @apiGroup Album
    * @apiParam  {number} id ID
    * @apiParamExample  {json} Request-Example:
    *    {https://utfmusic.me/v1/album/5/musicas}
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "5",
    *       "nome": "Album",
    *       "capa": "url capa",
    *       "nomeArtista": "rafa moreira",
    *       "descricao": "bro"
    *   }
    * @apiErrorExample {json} Album inválido:
    *   {
    *        "erro": "ALBUM_INVALIDO"
    *   }
    *
    */
    async getMusicas(id) {
        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };
        const musicas = await this.musicaAprovadaRepository.getByAlbum(id);
        return {
            "id": album.id,
            "musicas": musicas
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
    typedi_1.Inject(),
    __metadata("design:type", MusicaAprovadaRepository_1.default)
], AlbumController.prototype, "musicaAprovadaRepository", void 0);
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "get", null);
__decorate([
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, InsertRequest]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "submitAlbum", null);
__decorate([
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Put("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.Body({ validate: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, InsertRequest]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "update", null);
__decorate([
    routing_controllers_1.Authorized("PUBLICADORA"),
    routing_controllers_1.Delete("/"),
    __param(0, routing_controllers_1.CurrentUser({ required: true })),
    __param(1, routing_controllers_1.BodyParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "delete", null);
__decorate([
    routing_controllers_1.Get("/:id/musicas"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getMusicas", null);
AlbumController = __decorate([
    routing_controllers_1.JsonController("/album")
], AlbumController);
exports.default = AlbumController;
//# sourceMappingURL=AlbumController.js.map