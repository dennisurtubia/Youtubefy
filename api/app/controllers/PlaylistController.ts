import { Authorized, CurrentUser, JsonController, Body, Put } from "routing-controllers";
import PlaylistPrivadaRepository from "../repositories/PlaylistPublicaRepository"
import { IsNotEmpty, IsString } from "class-validator";

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    nome: string = "";
    
}
@JsonController("/playlist")
export default class PlaylistController {
    PlaylistPrivadaRepository: any;

    @Authorized("OUVINTE")
    @Put("/")
    async update1(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ){
        const playlistPrivada = await this.PlaylistPrivadaRepository.getByEmail(email);
        if(playlistPrivada === null)
            return;

        playlistPrivada.nome = req.nome;
        return{"sucesso": true};
    }
    @Authorized("ADMIN")
    @Put("/")
    async update2(
        @CurrentUser({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ){
        const playlistPrivada = await this.PlaylistPrivadaRepository.getByEmail(email);
        if(playlistPrivada === null)
            return;

        playlistPrivada.nome = req.nome;
        return{"sucesso": true};
    }
}

// TODO:
/*

    Criar, listar, atualizar, remover playlists públicas. CRUD simples
    Criar, listar, atualizar, remover playlists privadas. CRUD n:n
    Documentar
    Adicionar jwt

*/