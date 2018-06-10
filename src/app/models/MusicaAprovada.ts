import Musica from "./Musica";
import Album from "./Album";

export default class MusicaAprovada extends Musica {

    private album!: Album;

    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }
}