"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(id, nome, email, senha) {
        this._id = 0;
        this._nome = "";
        this._email = "";
        this._senha = "";
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
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
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get senha() {
        return this._senha;
    }
    set senha(value) {
        this._senha = value;
    }
}
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map