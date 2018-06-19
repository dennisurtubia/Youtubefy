import Musica from "./Musica";

export default class MusicaNaoAprovada extends Musica {

    private _dataAvaliacao!: Date;
    private _idAdministrador: number = 0;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }

    public get dataAvaliacao(): Date {
        return this._dataAvaliacao;
    }
    public set data_avaliacao(value: Date) {
        this._dataAvaliacao = value;
    }

    public get administrador(): number {
        return this._idAdministrador;
    }
    public set administrador(value: number) {
        this._idAdministrador = value;
    }
}