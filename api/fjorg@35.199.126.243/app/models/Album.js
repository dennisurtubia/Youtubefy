"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Album {
    constructor(id, capa = "", nome, nomeArtista, descricao = "", idPublicadora) {
        this._id = 0;
        this._capa = "";
        this._nome = "";
        this._nomeArtista = "";
        this._descricao = "";
        this._idPublicadora = 0;
        this._id = id;
        this._capa = capa;
        this._nome = nome;
        this._nomeArtista = nomeArtista;
        this._descricao = descricao;
        this._idPublicadora = idPublicadora;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get capa() {
        return this._capa;
    }
    set capa(value) {
        this._capa = value;
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
    get nomeArtista() {
        return this._nomeArtista;
    }
    set nomeArtista(value) {
        this._nomeArtista = value;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(value) {
        this._descricao = value;
    }
    get idPublicadora() {
        return this._idPublicadora;
    }
    set idPublicadora(value) {
        this._idPublicadora = value;
    }
}
exports.default = Album;
//# sourceMappingURL=Album.js.map