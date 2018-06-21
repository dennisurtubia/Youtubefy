import { IsEnum, IsNumber } from "class-validator";
import { Authorized, Body, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import MusicaAprovada from "../models/MusicaAprovada";
import MusicaNaoAprovada from "../models/MusicaNaoAprovada";
import AdminRepository from "../repositories/AdminRepository";
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

// TODO:
/*
    Documentar
    Exluir, atualizar. CRUD simples

*/

@JsonController("/musica")
export default class MusicaController {

    @Inject()
    private adminRepository!: AdminRepository;

    @Inject()
    private musicaAprovadaRepository!: MusicaAprovadaRepository;

    @Inject()
    private musicaNaoAprovadaRepository!: MusicaNaoAprovadaRepository;

    @Inject()
    private musicaNaoAvaliadaRepository!: MusicaNaoAvaliadaRepository;

    @Authorized("ADMIN")
    @Get("/nao-avaliadas")
    async getNaoAvaliadas(
        @CurrentUser({ required: true }) email: string,
    ) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        return {
            "naoAvaliadas": await this.musicaNaoAvaliadaRepository.getAll()
        };
    }

    @Authorized("ADMIN")
    @Post("/avaliar")
    async avaliar(
        @CurrentUser({ required: true }) email: string,
        @Body() req: AvaliarRequest
    ) {

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

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