import Album from "./Album";
import Musica from "./Musica";
import Administrador from "./Administrador";

export default class MusicaNaoAprovada extends Musica {

    private _album!: Album;
    private _dataAvaliacao!: Date;
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

    public get dataAvaliacao(): Date {
        return this._dataAvaliacao;
    }
    public set data_avaliacao(value: Date) {
        this._dataAvaliacao = value;
    }

    public get administrador(): Administrador {
        return this._administrador;
    }
    public set administrador(value: Administrador) {
        this._administrador = value;
    }
}