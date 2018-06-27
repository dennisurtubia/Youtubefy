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
let UsuarioRepository = class UsuarioRepository {
    async getByEmail(email) {
        const query = `
            SELECT a.email
            FROM Administrador a
            WHERE a.email = ?
        `;
        return await this.database.queryOne(query, [email]);
    }
    async getById(id) {
        const query = `
            SELECT u.id, u.nome, u.email, u.senha
            FROM Usuario u
            WHERE u.id = ?
        `;
        return await this.database.queryOne(query, [id]);
    }
    async getAll() {
        const query = `
            SELECT u.id, u.nome, u.email, u.senha
            FROM Usuario u
        `;
        return await this.database.queryAll(query, []);
    }
    async add(object) {
        const query1 = `
            INSERT INTO Usuario
            VALUES (0, ?, ?, ?)
        `;
        let insertId = await this.database.query(query1, [object.nome, object.email, object.senha]);
        if (insertId === -1) {
            return -1;
        }
        return insertId;
    }
    async update(id, object) {
        const query2 = `
            UPDATE Usuario u
            SET u.nome = ?, u.email = ?, u.senha = ?
            WHERE u.id = ?
        `;
        await this.database.query(query2, [object.nome, object.email, object.senha, id]);
    }
    async delete(id) {
        const query2 = `
            DELETE FROM Usuario
            WHERE id = ?
        `;
        await this.database.query(query2, [id]);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Database_1.default)
], UsuarioRepository.prototype, "database", void 0);
UsuarioRepository = __decorate([
    typedi_1.Service()
], UsuarioRepository);
exports.default = UsuarioRepository;
//# sourceMappingURL=UsuarioRepository.js.map