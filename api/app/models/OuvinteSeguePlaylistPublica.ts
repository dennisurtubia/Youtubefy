import Ouvinte from "./Ouvinte";
import PlaylistPublica from "./PlaylistPublica";

export default class OuvinteSeguePlaylistPublica {
    private _ouvinte!: Ouvinte;
    private _playlistPublica!: PlaylistPublica;

    constructor(ouvinte: Ouvinte, PlaylistPublica: PlaylistPublica) {
        this._ouvinte = ouvinte;
        this._playlistPublica = PlaylistPublica;
    }

    public get ouvinte(): Ouvinte {
        return this._ouvinte;
    }
    public set ouvinte(value: Ouvinte) {
        this._ouvinte = value;
    }

    public get playlistPrivada(): PlaylistPublica {
        return this._playlistPublica;
    }
    public set playlistPrivada(value: PlaylistPublica) {
        this._playlistPublica = value;
    }
}