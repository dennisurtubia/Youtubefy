import Musica from "./Musica";
import Album from "./Album";

export default class MusicaAprovada extends Musica {

    private _album!: Album;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }

    public get album(): Album {
        return this._album;
    }
    public set album(value: Album) {
        this._album = value;
    }
}