import Album from "./Album";
import Musica from "./Musica";
import Administrador from "./Administrador";

export default class MusicaAprovada extends Musica {

    private _album!: Album;
    private _data_avaliacao!: Date;
    private _administrador!: Administrador;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }

    public get album(): Album {
        return this._album;
    }
    public set album(value: Album) {
        this._album = value;
    }

    public get data_avaliacao_1(): Date {
        return this._data_avaliacao;
    }
    public set data_avaliacao_1(value: Date) {
        this._data_avaliacao = value;
    }

    public get administrador_1(): Administrador {
        return this._administrador;
    }
    public set administrador_1(value: Administrador) {
        this._administrador = value;
    }
}