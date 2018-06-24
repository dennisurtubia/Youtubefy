export default class Genero {
    private _id: number = 0;
    private _nome: string = "";
    private _idAdministrador: number = 0;

    constructor(id: number, nome: string, idAdministrador: number) {
        this._id = id;
        this._nome = nome;
        this._idAdministrador = idAdministrador;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    public get idAdministrador(): number {
        return this._idAdministrador;
    }
    public set idAdministrador(value: number) {
        this._idAdministrador = value;
    }
}