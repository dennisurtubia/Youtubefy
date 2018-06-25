import Musica from "./Musica";

export default class MusicaNaoAvaliada extends Musica {
    constructor(id: number, nome: string, duracao: number, explicito: boolean, url: string, idGenero: number, idAlbum: number) {
        super(id, nome, duracao, explicito, url, idGenero, idAlbum);
    }
}