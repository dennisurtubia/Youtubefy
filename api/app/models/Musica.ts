export default class Musica {
    private _id: number = 0;
    private _nome: string = "";
    private _duracao: number = 0;
    private _explicito: boolean = false;
    private _url: string = "";
    private _idGenero: number = 0;
    private _idAlbum: number = 0;

    constructor(id: number, nome: string, duracao: number, explicito: boolean, url:string, idGenero: number, idAlbum: number) {
        this._id = id;
        this._nome = nome;
        this._duracao = duracao;
        this._explicito = explicito;
        this._url = url;
        this._idGenero = idGenero;
        this._idAlbum = idAlbum;
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

    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }


    public get idGenero(): number {
        return this._idGenero;
    }

    public set idGenero(value: number) {
        this._idGenero = value;
    }

    public get idAlbum(): number {
        return this._idAlbum;
    }
    public set idAlbum(value: number) {
        this._idAlbum = value;
    }
}