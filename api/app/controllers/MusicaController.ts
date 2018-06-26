import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
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
    id: number = 0;

    @IsEnum(Avaliacao)
    avaliacao: Avaliacao = Avaliacao.Reprovado;

    @IsOptional()
    @IsString()
    observacao: string = "";
}


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

    // ------------------------------------------------------ REGRAS DE NEGOCIO ------------------------------------------------------

    /**
    * 
    * @api {get} /musica/naoavaliadas Listar músicas não avaliadas
    * @apiName ListarMusicasNaoAvaliadas
    * @apiGroup Musica
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "naoAvaliadas": []
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   } 
    */
    @Authorized("ADMIN")
    @Get("/naoavaliadas")
    async getNaoAvaliadas(
        @CurrentUser({ required: true }) email: string,
    ) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const musicas = await this.musicaNaoAvaliadaRepository.getAll();


        return {
            "naoAvaliadas": musicas
        };
    }

    /**
    * 
    * @api {get} /musica/aprovadas Listar músicas aprovadas
    * @apiName ListarMusicasAprovadas
    * @apiGroup Musica
    * 
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "aprovadas": []
    *   }
    */
    @Get("/aprovadas")
    async getAprovadas(
    ) {
        const musicas = await this.musicaAprovadaRepository.getAll();
        return {
            "aprovadas": musicas
        };
    }

    /**
    * 
    * @api {get} /musica/reprovadas Listar músicas reprovadas
    * @apiName ListarMusicasAprovadas
    * @apiGroup Musica
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "aprovadas": []
    *   }
    */
    @Authorized("ADMIN")
    @Get("/reprovadas")
    async getReprovadas(
    ) {
        const musicas = await this.musicaNaoAprovadaRepository.getAll();
        return {
            "reprovadas": musicas
        };
    }

    /**
    * 
    * @api {post} /musica/avaliar Aprovar/Reprovar música
    * @apiName AvaliarMusica
    * @apiGroup Musica
    * 
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/admin?token=deadbeef
    * @apiParam  {number} id ID
    * @apiParam  {String} avaliacao "aprovado" | "reprovado"
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "id": 1,
    *       "avaliacao": "reprovado"
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "sucesso": true
    *   }
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "ADMIN_INVALIDO"
    *   } 
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "MUSICA_INVALIDA"
    *   } 
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "MUSICA_ESTA_REPROVADA"
    *   } 
    * @apiErrorExample {json} Email já existe:
    *   {
    *       "erro": "MUSICA_ESTA_APROVADA"
    *   } 
    * @apiErrorExample {json} Acesso negado:
    *   {
    *        "erro": "ACESSO_NEGADO"
    *   } 
    * @apiErrorExample {json} Erro body:
    *   {
    *        "erro": "ERRO_BODY"
    *   }  
    */
    @Authorized("ADMIN")
    @Post("/avaliar")
    async avaliar(
        @CurrentUser({ required: true }) email: string,
        @Body() req: AvaliarRequest
    ) {

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };


        let musica = await this.musicaNaoAvaliadaRepository.getById(req.id);
        console.log('id: ' + req.id);
        console.log(musica);

        if (musica === null) {
            musica = await this.musicaAprovadaRepository.getById(req.id);
            if (musica === null) {


                musica = await this.musicaNaoAprovadaRepository.getById(req.id);
                if (musica === null)
                    return { "erro": "MUSICA_INVALIDA" };

                if (req.avaliacao === Avaliacao.Aprovado) {
                    await this.musicaNaoAprovadaRepository.delete(musica.id);
                    await this.musicaAprovadaRepository.add(new MusicaAprovada(musica.id, musica.nome, musica.duracao, musica.explicito, musica.url, new Date(), 0, admin.id, musica.idGenero, musica.idAlbum));
                } else {
                    return { "erro": "MUSICA_ESTA_REPROVADA" };
                }
            } else {
                if (req.avaliacao === Avaliacao.Reprovado) {
                    await this.musicaAprovadaRepository.delete(musica.id);
                    await this.musicaNaoAprovadaRepository.add(new MusicaNaoAprovada(musica.id, musica.nome, musica.duracao, musica.explicito, musica.url, new Date(), req.observacao, admin.id, musica.idGenero, musica.idAlbum));
                } else {
                    return { "erro": "MUSICA_ESTA_APROVADA" };
                }
            }
        } else {
            await this.musicaNaoAvaliadaRepository.delete(musica.id);
            if (req.avaliacao === Avaliacao.Aprovado)
                await this.musicaAprovadaRepository.add(new MusicaAprovada(musica.id, musica.nome, musica.duracao, musica.explicito, musica.url, new Date(), 0, admin.id, musica.idGenero, musica.idAlbum));
            else if (req.avaliacao === Avaliacao.Reprovado)
                await this.musicaNaoAprovadaRepository.add(new MusicaNaoAprovada(musica.id, musica.nome, musica.duracao, musica.explicito, musica.url, new Date(), req.observacao, admin.id, musica.idGenero, musica.idAlbum));
        }

        return { "sucesso": true };
    }
}