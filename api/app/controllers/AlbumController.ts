import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Authorized, Body, BodyParam, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { Inject } from "typedi";
import Album from "../models/Album";
import MusicaNaoAvaliada from "../models/MusicaNaoAvaliada";
import AlbumRepository from "../repositories/AlbumRepository";
import GeneroRepository from "../repositories/GeneroRepository";
import MusicaAprovadaRepository from "../repositories/MusicaAprovadaRepository";
import MusicaNaoAvaliadaRepository from "../repositories/MusicaNaoAvaliadaRepository";
import PublicadoraRepository from "../repositories/PublicadoraRepository";

// TODO:
/*
    Listar, atualizar, CRUD simples
    Listar músicas do álbum. 1:n
*/

class InsertMusica {
    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsNumber()
    duracao: number = 0;

    @IsBoolean()
    explicito: boolean = false;

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

    @Inject()
    private musicaAprovadaRepository!: MusicaAprovadaRepository;

    /**
    * 
    * @api {get} /album/ Todos os álbuns
    * @apiName ListarAlbum
    * @apiGroup Album
    * @apiParamExample  {json} Request-Example:
    *    {https://utfmusic.me/v1/album/}
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "albuns": [
    *           {
    *               "id": "5",
    *               "nome": "Album",
    *               "capa": "url capa",
    *               "nomeArtista": "rafa moreira",
    *               "descricao": "bro"
    *           },
    *           {
    *               "id": "6",
    *               "nome": "Album",
    *               "capa": "url capa",
    *               "nomeArtista": "rafa moreira",
    *               "descricao": "bro"
    *           }
    *       ]
    *   {  
    *
    *   }
    *
    */
    @Get("/")
    async getAll(
    ) {

        const albums = await this.albumRepository.getAll();

        return {
            "albuns": albums
        }
    }


    /**
    * 
    * @api {get} /album/:id Informações do album
    * @apiName InfoAlbum
    * @apiGroup Album
    * @apiParam  {number} id ID
    * @apiParamExample  {json} Request-Example:
    *    {https://utfmusic.me/v1/album/5}
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "5",
    *       "nome": "Album",
    *       "capa": "url capa",
    *       "nomeArtista": "rafa moreira",
    *       "descricao": "bro"
    *   }
    * @apiErrorExample {json} Album inválido:
    *   {
    *        "erro": "ALBUM_INVALIDO"
    *   } 
    *
    */
    @Get("/:id")
    async get(
        @Param("id") id: number
    ) {

        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };

        return {
            "id": album.id,
            "nome": album.nome,
            "capa": album.capa,
            "nomeArtista": album.nomeArtista,
            "descricao": album.descricao
        }
    }


    /**
    * 
    * @api {get} /album/:id/musicas Músicas disponíveis do album
    * @apiName MusicasAlbum
    * @apiGroup Album
    * @apiParam  {number} id ID
    * @apiParamExample  {json} Request-Example:
    *    {https://utfmusic.me/v1/album/5/musicas}
    * @apiSuccessExample {json} Resposta bem sucessida:
    *   {
    *       "id": "5",
    *       "nome": "Album",
    *       "capa": "url capa",
    *       "nomeArtista": "rafa moreira",
    *       "descricao": "bro"
    *   }
    * @apiErrorExample {json} Album inválido:
    *   {
    *        "erro": "ALBUM_INVALIDO"
    *   } 
    *
    */
    @Get("/:id/musicas")
    async getMusicas(
        @Param("id") id: number
    ) {

        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };

        const musicas = await this.musicaAprovadaRepository.getByAlbum(id);
        console.log(musicas);

        return {
            "id": album.id,
            "musicas": musicas
        }
    }

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
                console.log(it);

                const musica = new MusicaNaoAvaliada(0, it.nome, it.duracao, it.explicito);
                musica.idAlbum = album.id;
                musica.idGenero = genero.id;
                musica.id = await this.musicaNaoAvaliadaRepository.add(musica);
                console.log('test:' + musica.id);

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

    @Authorized("PUBLICADORA")
    @Put("/")
    async update(
        @CurrentUser({ required: true }) id: number,
        @Body({ validate: true }) req: InsertRequest
    ) {

        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };

        album.nome = req.nome;
        album.descricao = req.descricao;
        album.nomeArtista = req.nomeArtista;
        album.capa = req.capa;

        return { "sucesso": true };
    }

    @Authorized("PUBLICADORA")
    @Delete("/")
    async delete(
        @CurrentUser({ required: true }) email: string,
        @BodyParam("id") id: number
    ) {
        const album = await this.albumRepository.getById(id);
        if (album === null)
            return { "erro": "ALBUM_INVALIDO" };

        const publicadora = await this.publicadoraRepository.getByEmail(email);
        if (publicadora === null)
            return { "erro": "PUBLICADORA_INVALIDA" };

        if (publicadora.id !== album.idPublicadora)
            return { "erro": "ACESSO_NEGADO" };

        await this.albumRepository.delete(id);

        return { "sucesso": true };
    }

}