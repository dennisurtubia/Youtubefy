"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusMusica;
(function (StatusMusica) {
    StatusMusica[StatusMusica["Aprovada"] = 1] = "Aprovada";
    StatusMusica[StatusMusica["NaoAprovada"] = 2] = "NaoAprovada";
    StatusMusica[StatusMusica["NaoAvaliada"] = 3] = "NaoAvaliada";
})(StatusMusica || (StatusMusica = {}));
class Musica {
    constructor(id, nome, duracao, explicito) {
        this._id = 0;
        this._nome = "";
        this._status = StatusMusica.NaoAvaliada;
        this._duracao = 0;
        this._explicito = false;
        this._id = id;
        this._nome = nome;
        this._duracao = duracao;
        this._explicito = explicito;
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
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get data_avaliacao() {
        return this._data_avaliacao;
    }
    set data_avaliacao(value) {
        this._data_avaliacao = value;
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
    get administrador() {
        return this._administrador;
    }
    set administrador(value) {
        this._administrador = value;
    }
    get genero() {
        return this._genero;
    }
    set genero(value) {
        this._genero = value;
    }
}
exports.default = Musica;
//# sourceMappingURL=Musica.js.map