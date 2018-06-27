"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OuvinteSeguePlaylistPublica {
    constructor(ouvinte, playlistPublica) {
        this._idOuvinte = 0;
        this._idPlaylistPublica = 0;
        this._idOuvinte = ouvinte;
        this._idPlaylistPublica = playlistPublica;
    }
    get idOuvinte() {
        return this._idOuvinte;
    }
    set idOuvinte(value) {
        this._idOuvinte = value;
    }
    get idPlaylistPrivada() {
        return this._idPlaylistPublica;
    }
    set idPlaylistPrivada(value) {
        this._idPlaylistPublica = value;
    }
}
exports.default = OuvinteSeguePlaylistPublica;
//# sourceMappingURL=OuvinteSeguePlaylistPublica.js.map