import { IsArray, IsNotEmpty, IsNumber, IsString, IsBoolean, ValidateNested } from "class-validator";
import { Body, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import AlbumRepository from "../repositories/AlbumRepository";
import { isString } from "util";
import Album from "../models/Album";


class InsertMusica {
    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsNumber()
    duracao: number = 0;

    @IsBoolean()
    explicto: boolean = false;
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
     *                          "Corsinha Amarelo",
     *                          "duracao": 240,
     *                          "explicito": true
     *                      }, 
     *                      {
     *                          "Comprar alimento",
     *                          "duracao": 240,
     *                          "explicito": false
     *                      }, 
     *                  ]
     *    }
     */
    @Post("/")
    async submitMusic(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest) {


        if (!isString(token) || token.length <= 0)
            return { "erro": "TOKEN_INVALIDO" };

        
            const album = new Album(0, req.capa, req.nome, req.nomeArtista, req.descricao, req.idPublicadora);

        await this.albumRepository.add()

    }

}