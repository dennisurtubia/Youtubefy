export default class OuvinteSeguePlaylistPublica {
    private _idOuvinte: number = 0;
    private _idPlaylistPublica: number = 0;

    constructor(ouvinte: number, playlistPublica: number) {
        this._idOuvinte = ouvinte;
        this._idPlaylistPublica = playlistPublica;
    }

    public get idOuvinte(): number {
        return this._idOuvinte;
    }
    public set idOuvinte(value: number) {
        this._idOuvinte = value;
    }

    public get idPlaylistPrivada(): number {
        return this._idPlaylistPublica;
    }

    public set idPlaylistPrivada(value: number) {
        this._idPlaylistPublica = value;
    }
}