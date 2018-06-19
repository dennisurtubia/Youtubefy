"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaylistTemMusicaAprovada {
    constructor(playlist, musica) {
        this._idPlaylist = 0;
        this._idMusica = 0;
        this._idPlaylist = playlist;
        this._idMusica = musica;
    }
    get idPlaylist() {
        return this._idPlaylist;
    }
    set idPlaylist(value) {
        this._idPlaylist = value;
    }
    get idMusica() {
        return this._idMusica;
    }
    set idMusica(value) {
        this._idMusica = value;
    }
}
exports.default = PlaylistTemMusicaAprovada;
//# sourceMappingURL=PlaylistTemMusicaAprovada.js.map