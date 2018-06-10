export enum TipoUsuario {
    Ouvinte = 1,
    Publicadora,
    Administrador
}

export default class Usuario {
    private _id: number = 0;
    private _nome: string = "";
    private _email: string = "";
    private _senha: string = "";
    private _tipo: number = TipoUsuario.Administrador;

    constructor(nome: string, tipo: number) {
        this._nome = nome;
        this._tipo = tipo;
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

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get senha(): string {
        return this._senha;
    }
    public set senha(value: string) {
        this._senha = value;
    }

    public get tipo(): number {
        return this._tipo;
    }
    public set tipo(value: number) {
        this._tipo = value;
    }
}