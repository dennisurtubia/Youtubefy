"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OuvinteTemMusicaAprovada {
    constructor(ouvinte, musica) {
        this._idOuvinte = 0;
        this._idMusica = 0;
        this._idOuvinte = ouvinte;
        this._idMusica = musica;
    }
    get idOuvinte() {
        return this._idOuvinte;
    }
    set idOuvinte(value) {
        this._idOuvinte = value;
    }
    get idMusica() {
        return this._idMusica;
    }
    set idMusica(value) {
        this._idMusica = value;
    }
}
exports.default = OuvinteTemMusicaAprovada;
//# sourceMappingURL=OuvinteTemMusicaAprovada.js.map