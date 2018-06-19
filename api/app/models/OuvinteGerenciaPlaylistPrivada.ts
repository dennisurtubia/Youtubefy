export default class OuvinteGerenciaPlaylistPrivada {
    private _idOuvinte: number = 0;
    private _idPlaylistPrivada: number = 0;

    constructor(ouvinte: number, playlistPrivada: number) {
        this._idOuvinte = ouvinte;
        this._idPlaylistPrivada = playlistPrivada;
    }

    public get idOuvinte(): number {
        return this._idOuvinte;
    }
    public set idOuvinte(value: number) {
        this._idOuvinte = value;
    }

    public get idPlaylistPrivada(): number {
        return this._idPlaylistPrivada;
    }
    public set idPlaylistPrivada(value: number) {
        this._idPlaylistPrivada = value;
    }
}