import { IsArray, IsNotEmpty, IsNumber, IsString, IsBoolean, ValidateNested } from "class-validator";
import { Body, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import AlbumRepository from "../repositories/AlbumRepository";
import { isString } from "util";
import Album from "../models/Album";
import PublicadoraRepository from "../repositories/PublicadoraRepository";
import Musica from "../models/Musica";
import MusicaNaoAvaliada from "../models/MusicaNaoAvaliada";
import GeneroRepository from "../repositories/GeneroRepository";
import MusicaNaoAvaliadaRepository from "../repositories/MusicaNaoAvaliadaRepository";


class InsertMusica {
    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsNumber()
    duracao: number = 0;

    @IsBoolean()
    explicto: boolean = false;

    @IsNumber()
    genero: number = 0;
}

class InsertRequest {
    @IsString()
    capa: string = "";

    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsString()
    @IsNotEmpty()
    nomeArtista: string = "";

    @IsString()
    descricao: string = "";

    @IsNumber()
    idPublicadora: number = 0;

    @IsArray()
    @ValidateNested()
    musicas!: InsertMusica[];
}

@JsonController("/album")
export default class AlbumController {

    @Inject()
    private albumRepository!: AlbumRepository;

    @Inject()
    private publicadoraRepository!: PublicadoraRepository;

    @Inject()
    private generoRepository!: GeneroRepository;

    @Inject()
    private musicaNaoAvaliadaRepository!: MusicaNaoAvaliadaRepository;


    /**
     * 
     * @api {post} /album Submeter album  
     * @apiName SubmitAlbum
     * @apiGroup Album
     * 
     * @apiHeader {String} token Token da Publicadora (por enquanto é o id)
     * @apiParam  {String} capa URL da capa
     * @apiParam  {String} nome Nome
     * @apiParam  {String} nomeArtista Nome do artista
     * @apiParam  {String} descricao Descrição
     * @apiParam  {Number} idPublicadora Id da publicadora
     * @apiParam  {object[]} musicas Musicas
     * @apiHeaderExample {json} Exemplo Header:
     *    {
     *       "token": "1234"       
     *    }
     * @apiParamExample  {json} Exemplo:
     *    {
     *       "capa": "https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg",
     *       "nome": "Vou cutucar seu",
     *       "nomeArtista": "dennis dj",
     *       "descricao": "vem q eu vou te",
     *       "idPublicadora": 12344321,
     *       "musicas": [ 
     *                      {
     *                          "nome": "Corsinha Amarelo",
     *                          "duracao": 240,
     *                          "explicito": true,
     *                          "genero": 1
     *                      }, 
     *                      {
     *                          "nome": "Comprar alimento",
     *                          "duracao": 240,
     *                          "explicito": false,
     *                          "genero": 24
     *                      }, 
     *                  ]
     *    }
     * @apiSuccessExample {json} Resposta bem sucessida:
     *    {
     *        "musicasAdicionadas": [1],
     *        "musicasNaoAdicionadas": [24]
     *    }
     * @apiErrorExample {json} Resposta com erro:
     *   {
     *        "erro": "TOKEN_INVALIDO"
     *   } 
     *
     */
    @Post("/")
    async submitAlbum(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest) {

        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        const publicadora = await this.publicadoraRepository.getById(Number.parseInt(token));
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        const album = new Album(0, req.capa, req.nome, req.nomeArtista, req.descricao, publicadora);
        album.id = await this.albumRepository.add(album);

        let musicasAdicionadas = [];
        let musicasNaoAdicionadas = [];

        for (let it of req.musicas) {

            let genero = await this.generoRepository.getById(it.genero);
            if (genero !== null) {
                const musica = new MusicaNaoAvaliada(0, it.nome, it.duracao, it.explicto);
                musica.album = album;
                musica.genero = genero;
                musica.id = await this.musicaNaoAvaliadaRepository.add(musica);
                musicasAdicionadas.push(it.nome);
            } else {
                musicasNaoAdicionadas.push(it.nome);
            }
        }

        return {
            "musicasAdicionadas": musicasAdicionadas,
            "musicasNaoAdicionadas": musicasNaoAdicionadas
        };
    }
}