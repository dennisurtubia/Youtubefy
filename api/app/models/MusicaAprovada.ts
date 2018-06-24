import Musica from "./Musica";

export default class MusicaAprovada extends Musica {

    private _dataAprov!: Date;
    private _plays: number = 0;
    private _idAdministrador: number = 0;

    constructor(id: number, nome: string, duracao: number, explicito: boolean, dataAprov: Date, plays: number, idAdministrador: number, idGenero: number, idAlbum: number) {
        super(id, nome, duracao, explicito, idGenero, idAlbum);
        this._dataAprov = dataAprov;
        this._plays = plays;
        this._idAdministrador = idAdministrador;
    }

    public get dataAprov(): Date {
        return this._dataAprov;
    }
    public set dataAprov(value: Date) {
        this._dataAprov = value;
    }


    public get plays(): number {
        return this._plays;
    }
    public set plays(value: number) {
        this._plays = value;
    }

    public get idAdministrador(): number {
        return this._idAdministrador;
    }
    public set idAdministrador(value: number) {
        this._idAdministrador = value;
    }


}