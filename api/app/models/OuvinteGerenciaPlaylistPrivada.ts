import Ouvinte from "./Ouvinte";
import PlaylistPrivada from "./PlaylistPrivada";

export default class OuvinteGerenciaPlaylsitPrivada {
    private _ouvinte!: Ouvinte;
    private _playlistPrivada!: PlaylistPrivada;

    constructor(ouvinte: Ouvinte, PlaylistPrivada: PlaylistPrivada) {
        this._ouvinte = ouvinte;
        this._playlistPrivada = PlaylistPrivada;
    }

    public get ouvinte(): Ouvinte {
        return this._ouvinte;
    }
    public set ouvinte(value: Ouvinte) {
        this._ouvinte = value;
    }

    public get playlistPrivada(): PlaylistPrivada {
        return this._playlistPrivada;
    }
    public set playlistPrivada(value: PlaylistPrivada) {
        this._playlistPrivada = value;
    }
}