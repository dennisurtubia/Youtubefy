"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("./Usuario"));
class Publicadora extends Usuario_1.default {
    constructor(id, cnpj, nome, email, senha) {
        super(id, nome, email, senha);
        this._cnpj = "";
        this._cnpj = cnpj;
    }
    get cnpj() {
        return this._cnpj;
    }
    set cnpj(value) {
        this._cnpj = value;
    }
}
exports.default = Publicadora;
//# sourceMappingURL=Publicadora.js.map