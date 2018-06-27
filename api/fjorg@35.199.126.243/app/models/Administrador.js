"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("./Usuario"));
class Administrador extends Usuario_1.default {
    constructor(id, cpf, nome, email, senha) {
        super(id, nome, email, senha);
        this._cpf = "";
        this._cpf = cpf;
    }
    get cpf() {
        return this._cpf;
    }
    set cpf(value) {
        this._cpf = value;
    }
}
exports.default = Administrador;
//# sourceMappingURL=Administrador.js.map