import Administrador from "./Administrador";
import { Genero } from "./Genero";

enum StatusMusica {
    Aprovada = 1,
    NaoAprovada,
    NaoAvaliada
}

export default class Musica {
    private _id: number = 0;
    private _nome: string = "";
    private _status: number = StatusMusica.NaoAvaliada;
    private _data_avaliacao!: Date;
    private _duracao: number = 0;
    private _explicito: boolean = false;
    private _administrador!: Administrador;
    private _genero!: Genero;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        this._id = id;
        this._nome = nome;
        this._duracao = duracao;
        this._explicito = explicito;
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

    public get status(): number {
        return this._status;
    }
    public set status(value: number) {
        this._status = value;
    }

    public get data_avaliacao(): Date {
        return this._data_avaliacao;
    }
    public set data_avaliacao(value: Date) {
        this._data_avaliacao = value;
    }

    public get duracao(): number {
        return this._duracao;
    }
    public set duracao(value: number) {
        this._duracao = value;
    }

    public get explicito(): boolean {
        return this._explicito;
    }
    public set explicito(value: boolean) {
        this._explicito = value;
    }

    public get administrador(): Administrador {
        return this._administrador;
    }

    public set administrador(value: Administrador) {
        this._administrador = value;
    }

    public get genero(): Genero {
        return this._genero;
    }

    public set genero(value: Genero) {
        this._genero = value;
    }
}