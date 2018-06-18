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
        throw new Error("Method not implemented.");
    }
    async getAll() {
        const query = `
        SELECT g.id, g.nome
        FROM Genero g
        `;
        return await this.database.query(query, []);
    }
    async add(object) {
        const query = `
        INSERT INTO Genero
        VALUES (0, ?, ?)
        `;
        await this.database.query(query, [object.nome, object.administrador.id]);
    }
    async update(id, object) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        throw new Error("Method not implemented.");
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