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
let MusicaAprovadaRepository = class MusicaAprovadaRepository {
    async getByGenero(id) {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE m.idGenero = ?
        `;
        return await this.database.queryAll(query, [id]);
    }
    async getByAlbum(id) {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE m.idAlbum = ?
        `;
        return await this.database.queryAll(query, [id]);
    }
    async getByAdmin(id) {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE ma.idAdministrador = ?
        `;
        return await this.database.queryAll(query, [id]);
    }
    async getById(id) {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE m.id = ?
        `;
        return await this.database.queryOne(query, [id]);
    }
    async getAll() {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
        `;
        return await this.database.queryAll(query, []);
    }
    async add(object) {
        const query1 = `
            INSERT INTO Musica
            VALUES (0, ?, ?, ?, ?, ?, ?)
        `;
        let insertId = await this.database.query(query1, [object.nome, object.duracao, object.explicito, object.url, object.idGenero, object.idAlbum]);
        if (insertId === -1)
            return -1;
        const query2 = `
            INSERT INTO MusicaAprovada
            VALUES (?, ?, ?, ?);
        `;
        let insertId2 = await this.database.query(query2, [insertId, object.dataAprov, object.plays, object.idAdministrador]);
        if (insertId2 === -1) {
            await this.database.query('DELETE FROM Musica WHERE id = ?', [insertId]);
            return -1;
        }
        return insertId;
    }
    async update(id, object) {
        const query = `
            UPDATE MusicaAprovada ma
            SET ma.dataAprov = ?, ma.plays = ?
            WHERE ma.id = ?
        `;
        await this.database.query(query, [object.dataAprov, object.plays, id]);
        const query2 = `
            UPDATE Musica m
            SET m.nome = ?, m.duracao = ?, m.explicito = ?, m.url = ?, m.idGenero = ?, m.idAlbum = ?
            WHERE m.id = ?
        `;
        await this.database.query(query2, [object.nome, object.duracao, object.explicito, object.url, object.idGenero, object.idAlbum, id]);
    }
    async delete(id) {
        const query = `
            DELETE FROM MusicaAprovada
            WHERE id = ?
        `;
        await this.database.query(query, [id]);
        const query2 = `
            DELETE FROM Musica
            WHERE id = ?
        `;
        await this.database.query(query2, [id]);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Database_1.default)
], MusicaAprovadaRepository.prototype, "database", void 0);
MusicaAprovadaRepository = __decorate([
    typedi_1.Service()
], MusicaAprovadaRepository);
exports.default = MusicaAprovadaRepository;
//# sourceMappingURL=MusicaAprovadaRepository.js.map