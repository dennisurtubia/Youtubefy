import Playlist from "./Playlist";

export default class extends Playlist {
    private _idOuvinte: number = 0;

    constructor(id: number, nome: string, idOuvinte: number) {
        super(id, nome);
        this._idOuvinte = idOuvinte;
    }

    public get idOuvinte(): number {
        return this._idOuvinte;
    }
    public set idOuvinte(value: number) {
        this._idOuvinte = value;
    }
}