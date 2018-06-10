import Ouvinte from "./Ouvinte";
import MusicaAprovada from "./MusicaAprovada";

export default class OuvinteTemMusicaAprovada {
    private _ouvinte!: Ouvinte;
    private _musica!: MusicaAprovada;

    constructor(ouvinte: Ouvinte, musica: MusicaAprovada) {
        this._ouvinte = ouvinte;
        this._musica = musica;
    }

    public get ouvinte(): Ouvinte {
        return this._ouvinte;
    }
    public set ouvinte(value: Ouvinte) {
        this._ouvinte = value;
    }

    public get musica(): MusicaAprovada {
        return this._musica;
    }
    public set musica(value: MusicaAprovada) {
        this._musica = value;
    }
}