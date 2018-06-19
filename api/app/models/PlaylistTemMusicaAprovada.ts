export default class PlaylistTemMusicaAprovada {
    private _idPlaylist: number = 0;
    private _idMusica: number = 0;

    constructor(playlist: number, musica: number) {
        this._idPlaylist = playlist;
        this._idMusica = musica;
    }

    public get idPlaylist(): number {
        return this._idPlaylist;
    }
    public set idPlaylist(value: number) {
        this._idPlaylist = value;
    }

    public get idMusica(): number {
        return this._idMusica;
    }
    public set idMusica(value: number) {
        this._idMusica = value;
    }
}