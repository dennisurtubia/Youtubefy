"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Musica_1 = __importDefault(require("./Musica"));
class MusicaNaoAprovada extends Musica_1.default {
    constructor(id, nome, duracao, explicito) {
        super(id, nome, duracao, explicito);
        this._idAdministrador = 0;
    }
    get dataAvaliacao() {
        return this._dataAvaliacao;
    }
    set data_avaliacao(value) {
        this._dataAvaliacao = value;
    }
    get administrador() {
        return this._idAdministrador;
    }
    set administrador(value) {
        this._idAdministrador = value;
    }
}
exports.default = MusicaNaoAprovada;
//# sourceMappingURL=MusicaNaoAprovada.js.map