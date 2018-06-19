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
    async getById(id) {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito
            FROM MusicaAprovada m
            WHERE m.id = ?
        `;
        return await this.database.queryOne(query, [id]);
    }
    async getAll() {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito
            FROM MusicaAprovada m
        `;
        return await this.database.queryAll(query, []);
    }
    async add(object) {
        const query1 = `
            INSERT INTO Musica
            VALUES (0, ?, ?, ?, ?)
        `;
        const insertId = await this.database.query(query1, [object.nome, object.duracao, object.explicito, object.genero.id]);
        const query2 = `
            INSERT INTO MusicaAprovada
            VALUES (?);
        `;
        return await this.database.query(query2, [insertId]);
    }
    async update(id, object) {
        const query = `
            UPDATE MusicaAprovada m
            SET m.nome = ?, m.duracao = ?, m.explicito = ?
            WHERE m.id = ?
        `;
        await this.database.query(query, [object.nome, object.duracao, object.explicito, id]);
    }
    async delete(id) {
        const query = `
            DELETE FROM MusicaAprovada m
            WHERE m.id = ?
        `;
        await this.database.query(query, [id]);
        const query2 = `
            DELETE FROM Musica m
            WHERE m.id = ?
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