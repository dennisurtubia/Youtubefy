import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Authorized, Body, CurrentUser, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import Album from "../models/Album";
import MusicaNaoAvaliada from "../models/MusicaNaoAvaliada";
import AlbumRepository from "../repositories/AlbumRepository";
import GeneroRepository from "../repositories/GeneroRepository";
import MusicaNaoAvaliadaRepository from "../repositories/MusicaNaoAvaliadaRepository";
import PublicadoraRepository from "../repositories/PublicadoraRepository";

// TODO:
/*
    Listar, atualizar, remover álbuns. CRUD simples
    Listar músicas do álbum. 1:n
*/

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
    * @apiParam  {String} token Json Web Token
    * @apiParamExample  {String} Request-Example:
    *    https://utfmusic.me/v1/album?token=deadbeef
    * @apiParam  {String} capa URL da capa
    * @apiParam  {String} nome Nome
    * @apiParam  {String} nomeArtista Nome do artista
    * @apiParam  {String} descricao Descrição
    * @apiParam  {object[]} musicas Musicas
    * @apiParamExample  {json} Exemplo:
    *   {
    *       "capa": "https://pcache-pv-us1.badoocdn.com/p506/20486/2/1/4/1400806059/d1328272/t1508588594/c_8wBXuXaC94VXLn8hjatW9rorFe6zZV6LJGIETpAZlJo/1328272751/dfs_360/sz___size__.jpg",
    *       "nome": "Nome do álbum",
    *       "nomeArtista": "xxxtentacion",
    *       "descricao": "Album legal",
    *       "musicas": 
    *           [ 
    *               {
    *                   "nome": "Música 1",
    *                   "duracao": 240,
    *                   "explicito": true,
    *                   "genero": 1
    *               }, 
    *               {
    *                   "nome": "Música 2",
    *                   "duracao": 230,
    *                   "explicito": false,
    *                   "genero": 2
    *               } 
    *           ]
    *   }
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "musicasAdicionadas": [1],
    *       "musicasNaoAdicionadas": [24]
    *   }
    * @apiErrorExample {json} Resposta com erro:
    *   {
    *       "erro": "PUBLICADORA_INVALIDA"
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
    @Authorized("PUBLICADORA")
    @Post("/")
    async submitAlbum(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest) {


        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        const album = new Album(0, req.capa, req.nome, req.nomeArtista, req.descricao, publicadora.id);
        album.id = await this.albumRepository.add(album);

        let musicasAdicionadas = [];
        let musicasNaoAdicionadas = [];

        for (let it of req.musicas) {

            let genero = await this.generoRepository.getById(it.genero);
            if (genero !== null) {
                const musica = new MusicaNaoAvaliada(0, it.nome, it.duracao, it.explicto);
                musica.idAlbum = album.id;
                musica.idGenero = genero.id;
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