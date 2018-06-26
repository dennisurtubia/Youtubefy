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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Database_1 = __importDefault(require("./Database"));
let AlbumRepository = class AlbumRepository {
    async getByPublicadora(id) {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
            WHERE a.idPublicadora = ?
        `;
        return await this.database.queryAll(query, [id]);
    }
    async getById(id) {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
            WHERE a.id = ?
        `;
        return await this.database.queryOne(query, [id]);
    }
    async getAll() {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
        `;
        return await this.database.queryAll(query, []);
    }
    async add(object) {
        const query = `
            INSERT INTO Album
            VALUES (0, ?, ?, ?, ?, ?)
        `;
        return await this.database.query(query, [object.capa, object.nome, object.nomeArtista, object.descricao, object.idPublicadora]);
    }
    async update(id, object) {
        const query1 = `
            UPDATE Album a
            SET a.capa = ?, a.nome = ?, a.nomeArtista = ?, a.descricao = ?
            WHERE a.id = ?
        `;
        await this.database.query(query1, [object.capa, object.nome, object.nomeArtista, object.descricao, id]);
    }
    async delete(id) {
        const query1 = `
            DELETE FROM MusicaAprovada
            WHERE idAlbum = ?
        `;
        await this.database.query(query1, [id]);
        const query2 = `
            DELETE FROM MusicaNaoAprovada
            WHERE idAlbum = ?
        `;
        await this.database.query(query2, [id]);
        const query3 = `
            DELETE FROM MusicaNaoAvaliada
            WHERE idAlbum = ?
        `;
        await this.database.query(query3, [id]);
        const query4 = `
            DELETE FROM Musica
            WHERE idAlbum = ?
        `;
        await this.database.query(query4, [id]);
        const query5 = `
            DELETE FROM Album
            WHERE id = ?
        `;
        await this.database.query(query5, [id]);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Database_1.default)
], AlbumRepository.prototype, "database", void 0);
AlbumRepository = __decorate([
    typedi_1.Service()
], AlbumRepository);
exports.default = AlbumRepository;
//# sourceMappingURL=AlbumRepository.js.map