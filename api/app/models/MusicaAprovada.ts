import Administrador from "./Administrador";
import Musica from "./Musica";

export default class MusicaAprovada extends Musica {

    private _data_avaliacao!: Date;
    private _administrador!: Administrador;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }

    public get data_avaliacao(): Date {
        return this._data_avaliacao;
    }
    public set data_avaliacao(value: Date) {
        this._data_avaliacao = value;
    }

    public get administrador(): Administrador {
        return this._administrador;
    }
    public set administrador(value: Administrador) {
        this._administrador = value;
    }
}