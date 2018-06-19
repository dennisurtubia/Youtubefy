"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Musica_1 = __importDefault(require("./Musica"));
class MusicaAprovada extends Musica_1.default {
    constructor(id, nome, duracao, explicito) {
        super(id, nome, duracao, explicito);
        this._idAdministrador = 0;
    }
    get data_avaliacao() {
        return this._data_avaliacao;
    }
    set data_avaliacao(value) {
        this._data_avaliacao = value;
    }
    get idAdministrador() {
        return this._idAdministrador;
    }
    set idAdministrador(value) {
        this._idAdministrador = value;
    }
}
exports.default = MusicaAprovada;
//# sourceMappingURL=MusicaAprovada.js.map