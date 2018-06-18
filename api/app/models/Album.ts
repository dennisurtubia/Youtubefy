import Publicadora from "./Publicadora"

export default class Album {
    private _id: number = 0;
    private _publicadora!: Publicadora;
    private _capa: string = "";
    private _nome: string = "";
    private _nomeArtista: string = "";
    private _descricao: string = "";

    constructor(id: number, publicadora: Publicadora, capa: string, nome: string, nomeArtista: string, descricao: string){
        this._id = id;
        this._publicadora = publicadora;
        this._capa = capa;
        this._nome = nome;
        this._nomeArtista = nomeArtista;
        this._descricao = descricao;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get publicadora(): Publicadora {
        return this._publicadora;
    }
    public set publicadora(value: Publicadora) {
        this._publicadora = value;
    }
    public get capa(): string {
        return this._capa;
    }
    public set cnpj(value: string) {
        this._cnpj = value;
    }
    public get cnpj(): string {
        return this._cnpj;
    }
    public set cnpj(value: string) {
        this._cnpj = value;
    }
    public get cnpj(): string {
        return this._cnpj;
    }
    public set cnpj(value: string) {
        this._cnpj = value;
    }

}