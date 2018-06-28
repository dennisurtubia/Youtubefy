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
    ) {
        const playlistPrivada = await this.PlaylistPrivadaRepository.getByEmail(email);
        if (playlistPrivada === null)
            return;

        playlistPrivada.nome = req.nome;
        return { "sucesso": true };
    }
    @Authorized("ADMIN")
    @Put("/")
    async update2(
        @CurrentUseur({ required: true }) email: string,
        @Body({ validate: true }) req: InsertRequest
    ) {
        const playlistPrivada = await this.PlaylistPrivadaRepository.getByEmail(email);
        if (playlistPrivada === null)
            return;

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
        if (admin === null)
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