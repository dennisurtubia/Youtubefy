import Playlist from "./Playlist";
import MusicaAprovada from "./MusicaAprovada";


export default class PlaylistTemMusicaAprovada {
    private _playlist!: Playlist;
    private _musica!: MusicaAprovada;

    constructor(playlist: Playlist, musica: MusicaAprovada) {
        this._playlist = playlist;
        this._musica = musica;
    }

    public get playlist(): Playlist {
        return this._playlist;
    }
    public set playlist(value: Playlist) {
        this._playlist = value;
    }

    public get musica(): MusicaAprovada {
        return this._musica;
    }
    public set musica(value: MusicaAprovada) {
        this._musica = value;
    }
}