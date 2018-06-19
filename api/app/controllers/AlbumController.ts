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
     */
    async submitMusic(
        @HeaderParam("token") token: string,
        @Body({ validate: true }) req: InsertRequest) {

    }

}