"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OuvinteGerenciaPlaylistPrivada {
    constructor(ouvinte, playlistPrivada) {
        this._idOuvinte = 0;
        this._idPlaylistPrivada = 0;
        this._idOuvinte = ouvinte;
        this._idPlaylistPrivada = playlistPrivada;
    }
    get idOuvinte() {
        return this._idOuvinte;
    }
    set idOuvinte(value) {
        this._idOuvinte = value;
    }
    get idPlaylistPrivada() {
        return this._idPlaylistPrivada;
    }
    set idPlaylistPrivada(value) {
        this._idPlaylistPrivada = value;
    }
}
exports.default = OuvinteGerenciaPlaylistPrivada;
//# sourceMappingURL=OuvinteGerenciaPlaylistPrivada.js.map