import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";
import { Body, Get, HeaderParam, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { isString } from "util";
import Administrador from "../models/Administrador";
import AdminRepository from "../repositories/AdminRepository";

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsNumber()
    duracao: number = 0;

    @IsBoolean()
    explicito: boolean = false;
}

@JsonController("/album")
export default class AlbumController {

    @Inject()
    private adminRepository!: AdminRepository;


    @Post("/")
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
     * @apiParam  {Number[]} musicas IDs das músicas
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
     *       "musicas": [1,2,3,4,5]
     *    }
     */
    async submitMusic(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest) {

    }

}