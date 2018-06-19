"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Playlist {
    constructor(id, nome) {
        this._id = 0;
        this._nome = "";
        this._id = id;
        this._nome = nome;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
}
exports.default = Playlist;
//# sourceMappingURL=Playlist.js.map