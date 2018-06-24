"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Musica_1 = __importDefault(require("./Musica"));
class MusicaAprovada extends Musica_1.default {
    constructor(id, nome, duracao, explicito, dataAprov, plays, idAdministrador, idGenero, idAlbum) {
        super(id, nome, duracao, explicito, idGenero, idAlbum);
        this._plays = 0;
        this._idAdministrador = 0;
        this._dataAprov = dataAprov;
        this._plays = plays;
        this._idAdministrador = idAdministrador;
    }
    get dataAprov() {
        return this._dataAprov;
    }
    set dataAprov(value) {
        this._dataAprov = value;
    }
    get plays() {
        return this._plays;
    }
    set plays(value) {
        this._plays = value;
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