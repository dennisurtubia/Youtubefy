import Musica from "./Musica";

export default class MusicaAprovada extends Musica {

    private _data_avaliacao!: Date;
    private _idAdministrador: number = 0;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }

    public get data_avaliacao(): Date {
        return this._data_avaliacao;
    }
    public set data_avaliacao(value: Date) {
        this._data_avaliacao = value;
    }

    public get idAdministrador(): number {
        return this._idAdministrador;
    }
    public set idAdministrador(value: number) {
        this._idAdministrador = value;
    }
}