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
class OuvinteRepository {
    constructor() {
    }
    async getById(id) {
        const query = `
        SELECT u.id, a.cpf, u.nome, u.email, u.senha
        FROM Administrador a
        INNER JOIN Usuario u 
        ON a.id = u.id
        HAVING u.id = ?
        `;
        const rows = await this.database.query(query, [id]);
        if (rows.length == 0)
            return null;
        return rows[0];
    }
}
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", Database_1.default)
], OuvinteRepository.prototype, "database", void 0);
exports.default = OuvinteRepository;
//# sourceMappingURL=AdministradorRepository.1.js.map