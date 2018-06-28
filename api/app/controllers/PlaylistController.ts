import { Authorized, CurrentUser, JsonController, Body, Put, BodyParam, Param } from "routing-controllers";
import PlaylistPublicaRepository from "../repositories/PlaylistPublicaRepository"
import PlaylistPrivadaRepository from "../repositories/PlaylistPrivadaRepository"
import { IsNotEmpty, IsString } from "class-validator";
import { isNumber } from "util";

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    nome: string = "";

}
@JsonController("/playlist")
export default class PlaylistController {
    PlaylistPrivadaRepository: any;
    adminRepository: any;
    OuvinteRepository: any;
    PlaylistPublicaRepository: any;

    @Authorized("OUVINTE")
    @Put("/")
    async update1(
        @CurrentUser({ required: true }) email: string,
        @Param("id") id: number,
        @Body({ validate: true }) req: InsertRequest
    ) {

        const ouvinte = await this.OuvinteRepository.getByEmail(email);
        if(ouvinte === null)
            return;

        const playlistPrivada = await this.PlaylistPrivadaRepository.getById(id);
        if (playlistPrivada === null)
            return;

        playlistPrivada.nome = req.nome;
        return { "sucesso": true };
    }
    @Authorized("ADMIN")
    @Put("/")
    async update2(
        @CurrentUser({required: true}) email: string,
        @Param("id") id: number,
        @Body({ validate: true }) req: InsertRequest
    ) {
        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return;

        const playlistPrivada = await this.PlaylistPublicaRepository.getById(id); 

        playlistPrivada.nome = req.nome;
        return { "sucesso": true };
    }
    @Authorized("ADMIN")
    @Put("/")
    async delete1(
        @CurrentUser({ required: true }) email: string,
        @BodyParam("id") id: number
    ) {
        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const admin = await this.adminRepository.getByEmail(email);
        if (admin === null)
            return { "erro": "ADMIN_INVALIDO" };

        const playlistprivada = await this.PlaylistPrivadaRepository.getById(id);
        if (playlistprivada === null)
            return { "erro": "PlaylistPrivada_INVALIDA" };

        await this.PlaylistPrivadaRepository.delete(id);
        return { "sucesso": true };
    }
    @Authorized("OUVINTE")
    @Put("/")
    async delete2(
        @CurrentUser({ required: true }) email: string,
        @BodyParam("id") id: number
    ) {
        if (!isNumber(id))
            return { "erro": "ID_INVALIDO" };

        const ouvinte = await this.OuvinteRepository.getByEmail(email);
        if (ouvinte === null)
            return { "erro": "OUVINTE_INVALIDO" };

        const playlistpublica = await this.PlaylistPublicaRepository.getById(id);
        if (playlistpublica === null)
            return { "erro": "PlaylistPublica_INVALIDA" };

        await this.PlaylistPublicaRepository.delete(id);
        return { "sucesso": true };
    }
}

// TODO:
/*

    Criar, listar, atualizar, remover playlists públicas. CRUD simples
    Criar, listar, atualizar, remover playlists privadas. CRUD n:n
    Documentar
    Adicionar jwt

*/