import Musica from "./Musica";

export default class MusicaNaoAprovada extends Musica {


    private _dataReprov!: Date;
    private _observacao: string = "";
    private _idAdministrador: number = 0;

    constructor(id: number, nome: string, duracao: number, explicito: boolean, dataReprov: Date, observacao: string, idAdministrador: number, idGenero: number, idAlbum: number) {
        super(id, nome, duracao, explicito, idGenero, idAlbum);
        this._dataReprov = dataReprov;
        this._observacao = observacao;
        this._idAdministrador = idAdministrador;
    }

    public get dataReprov(): Date {
        return this._dataReprov;
    }
    public set dataReprov(value: Date) {
        this._dataReprov = value;
    }

    public get observacao(): string {
        return this._observacao;
    }
    public set observacao(value: string) {
        this._observacao = value;
    }

    public get idAdministrador(): number {
        return this._idAdministrador;
    }
    public set idAdministrador(value: number) {
        this._idAdministrador = value;
    }
}