export enum TipoUsuario {
    Ouvinte = 1,
    Publicadora,
    Administrador
}

export default class Usuario {
    private _nome: string = "";
    private _tipo: number = TipoUsuario.Administrador;

    constructor(nome: string, tipo: number) {
        this._nome = nome;
        this._tipo = tipo;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    public get tipo(): number {
        return this._tipo;
    }
    public set tipo(value: number) {
        this._tipo = value;
    }
}