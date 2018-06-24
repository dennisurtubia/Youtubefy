"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Musica {
    constructor(id, nome, duracao, explicito, idGenero, idAlbum) {
        this._id = 0;
        this._nome = "";
        this._duracao = 0;
        this._explicito = false;
        this._idGenero = 0;
        this._idAlbum = 0;
        this._id = id;
        this._nome = nome;
        this._duracao = duracao;
        this._explicito = explicito;
        this._idGenero = idGenero;
        this._idAlbum = idAlbum;
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
    get duracao() {
        return this._duracao;
    }
    set duracao(value) {
        this._duracao = value;
    }
    get explicito() {
        return this._explicito;
    }
    set explicito(value) {
        this._explicito = value;
    }
    get idGenero() {
        return this._idGenero;
    }
    set idGenero(value) {
        this._idGenero = value;
    }
    get idAlbum() {
        return this._idAlbum;
    }
    set idAlbum(value) {
        this._idAlbum = value;
    }
}
exports.default = Musica;
//# sourceMappingURL=Musica.js.map