export default class OuvinteTemMusicaAprovada {
    private _idOuvinte: number = 0;
    private _idMusica: number = 0;

    constructor(ouvinte: number, musica: number) {
        this._idOuvinte = ouvinte;
        this._idMusica = musica;
    }

    public get idOuvinte(): number {
        return this._idOuvinte;
    }
    public set idOuvinte(value: number) {
        this._idOuvinte = value;
    }

    public get idMusica(): number {
        return this._idMusica;
    }
    public set idMusica(value: number) {
        this._idMusica = value;
    }
}