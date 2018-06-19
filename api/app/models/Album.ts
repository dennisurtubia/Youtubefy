import Publicadora from "./Publicadora";

export default class Album {
    private _id: number = 0;
    private _capa: string = "";
    private _nome: string = "";
    private _nomeArtista: string = "";
    private _descricao: string = "";
    private _publicadora!: Publicadora;

    constructor(id: number, capa: string = "", nome: string, nomeArtista: string, descricao: string = "", publicadora: Publicadora) {
        this._id = id;
        this._capa = capa;
        this._nome = nome;
        this._nomeArtista = nomeArtista;
        this._descricao = descricao;
        this._publicadora = publicadora;
    }


    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get capa(): string {
        return this._capa;
    }

    public set capa(value: string) {
        this._capa = value;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(value: string) {
        this._nome = value;
    }

    public get nomeArtista(): string {
        return this._nomeArtista;
    }

    public set nomeArtista(value: string) {
        this._nomeArtista = value;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public set descricao(value: string) {
        this._descricao = value;
    }

    public get publicadora(): Publicadora {
        return this._publicadora;
    }

    public set publicadora(value: Publicadora) {
        this._publicadora = value;
    }
}