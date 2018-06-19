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
let GeneroRepository = class GeneroRepository {
    async getById(id) {
        const query = `
            SELECT g.id, g.nome, g.idAdministrador
            FROM Genero g
            WHERE g.id = ?
        `;
        return await this.database.queryOne(query, [id]);
    }
    async getAll() {
        const query = `
            SELECT g.id, g.nome, g.idAdministrador
            FROM Genero g
        `;
        return await this.database.queryAll(query, []);
    }
    async add(object) {
        const query1 = `
            INSERT INTO Genero
            VALUES (0, ?, ?)
        `;
        return await this.database.query(query1, [object.nome, object.idAdministrador]);
    }
    async update(id, object) {
        const query1 = `
            UPDATE Genero g
            SET g.nome = ?, g.idAdministrador = ?
            WHERE g.id = ?
        `;
        console.log(object.nome);
        await this.database.query(query1, [object.nome, object.idAdministrador, id]);
    }
    async delete(id) {
        const query = `
            DELETE FROM Genero
            WHERE id = ?
        `;
        await this.database.query(query, [id]);
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Database_1.default)
], GeneroRepository.prototype, "database", void 0);
GeneroRepository = __decorate([
    typedi_1.Service()
], GeneroRepository);
exports.default = GeneroRepository;
//# sourceMappingURL=GeneroRepository.js.map