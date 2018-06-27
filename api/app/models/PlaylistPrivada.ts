import Playlist from "./Playlist";

export default class extends Playlist {
    private _idOuvinte: number = 0;
    constructor(id: number, nome: string) {
        super(id, nome);
    }
}