"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Genero {
    constructor(id, nome, idAdministrador) {
        this._id = 0;
        this._nome = "";
        this._idAdministrador = 0;
        this._id = id;
        this._nome = nome;
        this._idAdministrador = idAdministrador;
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
    get idAdministrador() {
        return this._idAdministrador;
    }
    set idAdministrador(value) {
        this._idAdministrador = value;
    }
}
exports.default = Genero;
//# sourceMappingURL=Genero.js.map