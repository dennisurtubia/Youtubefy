"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Genero {
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
    get administrador() {
        return this._administrador;
    }
    set administrador(value) {
        this._administrador = value;
    }
}
exports.default = Genero;
//# sourceMappingURL=Genero.js.map