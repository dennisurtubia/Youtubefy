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
let OuvinteTemMusica = class OuvinteTemMusica {
    async getByOuvinte(id) {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            INNER JOIN OuvinteTemMusicaAprovada oma ON oma.idMusicaAprovada = m.id
            WHERE oma.idOuvinte = ?
        `;
        return await this.database.queryAll(query, [id]);
    }
    async adicionarMusica(idOuvinte, idMusica) {
        const query = `
            INSERT INTO OuvinteTemMusicaAprovada
            VALUES (?, ?)
        `;
        return await this.database.query(query, [idOuvinte, idMusica]);
    }
    async removerMusica(idOuvinte, idMusica) {
        const query = `
            DELETE FROM OuvinteTemMusicaAprovada
            WHERE idOuvinte = ? AND idMusicaAprovada = ?
        `;
        await this.database.query(query, [idOuvinte, idMusica]);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Database_1.default)
], OuvinteTemMusica.prototype, "database", void 0);
OuvinteTemMusica = __decorate([
    typedi_1.Service()
], OuvinteTemMusica);
exports.default = OuvinteTemMusica;
//# sourceMappingURL=OuvinteTemMusicaRepository.js.map