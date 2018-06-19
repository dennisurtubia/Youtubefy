import { IsEnum, IsNumber } from "class-validator";
import { Body, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import MusicaAprovada from "../models/MusicaAprovada";
import MusicaNaoAprovada from "../models/MusicaNaoAprovada";
import MusicaAprovadaRepository from "../repositories/MusicaAprovadaRepository";
import MusicaNaoAprovadaRepository from "../repositories/MusicaNaoAprovadaRepository";
import MusicaNaoAvaliadaRepository from "../repositories/MusicaNaoAvaliadaRepository";

enum Avaliacao {
    Aprovado = "aprovado",
    Reprovado = "reprovado"
}

class AvaliarRequest {

    @IsNumber()
    musica: number = 0;

    @IsEnum(Avaliacao)
    avaliacao: Avaliacao = Avaliacao.Reprovado;
}

@JsonController("/musica")
export default class MusicaController {

    @Inject()
    private musicaAprovadaRepository!: MusicaAprovadaRepository;

    @Inject()
    private musicaNaoAprovadaRepository!: MusicaNaoAprovadaRepository;

    @Inject()
    private musicaNaoAvaliadaRepository!: MusicaNaoAvaliadaRepository;

    @Get("/nao-avaliadas")
    async getNaoAvaliadas(@HeaderParam("token") token: string) {
        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };
        return {
            "naoAvaliadas": await this.musicaNaoAvaliadaRepository.getAll()
        };
    }

    @Post("/avaliar")
    async avaliar(
        @HeaderParam("token") token: string,
        @Body() req: AvaliarRequest
    ) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const musica = await this.musicaNaoAvaliadaRepository.getById(req.musica);
        if (musica === null)
            return { "erro": "MUSICA_INVALIDA" };

        await this.musicaNaoAvaliadaRepository.delete(musica.id);

        if (req.avaliacao == Avaliacao.Aprovado) {
            const musicaAprovada = new MusicaAprovada(musica.id, musica.nome, musica.duracao, musica.explicito);
            await this.musicaAprovadaRepository.add(musicaAprovada);
        } else {
            const musicaNaoAprovada = new MusicaNaoAprovada(musica.id, musica.nome, musica.duracao, musica.explicito);
            await this.musicaNaoAprovadaRepository.add(musicaNaoAprovada);
        }

        return { "sucesso": true };
    }
}