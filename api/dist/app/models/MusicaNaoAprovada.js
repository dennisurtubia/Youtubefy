"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Musica_1 = __importDefault(require("./Musica"));
class MusicaNaoAprovada extends Musica_1.default {
    constructor(id, nome, duracao, explicito, dataReprov, observacao, idAdministrador, idGenero, idAlbum) {
        super(id, nome, duracao, explicito, idGenero, idAlbum);
        this._observacao = "";
        this._idAdministrador = 0;
        this._dataReprov = dataReprov;
        this._observacao = observacao;
        this._idAdministrador = idAdministrador;
    }
    get dataReprov() {
        return this._dataReprov;
    }
    set dataReprov(value) {
        this._dataReprov = value;
    }
    get observacao() {
        return this._observacao;
    }
    set observacao(value) {
        this._observacao = value;
    }
    get idAdministrador() {
        return this._idAdministrador;
    }
    set idAdministrador(value) {
        this._idAdministrador = value;
    }
}
exports.default = MusicaNaoAprovada;
//# sourceMappingURL=MusicaNaoAprovada.js.map