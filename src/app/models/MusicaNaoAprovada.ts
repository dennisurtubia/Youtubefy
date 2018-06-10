import Musica from "./Musica";

export default class MusicaNaoAprovada extends Musica {
    constructor(id: number, nome: string, duracao: number, explicito: boolean) {
        super(id, nome, duracao, explicito);
    }
}