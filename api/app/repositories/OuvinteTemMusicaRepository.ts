import { Inject, Service } from "typedi";
import OuvinteTemMusicaAprovada from "../models/OuvinteTemMusicaAprovada";
import Database from "./Database";
import Ouvinte from "../models/Ouvinte";
import MusicaAprovada from "../models/MusicaAprovada";

type Entity = OuvinteTemMusicaAprovada;

@Service()
export default class OuvinteTemMusica {

    @Inject()
    database!: Database;

    async getByOuvinte(id: number): Promise<Entity[]> {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            INNER JOIN OuvinteTemMusicaAprovada oma ON oma.idMusicaAprovada = m.id
            WHERE oma.idOuvinte = ?
        `;

        return await this.database.queryAll<Entity>(query, [id])
    }

    async adicionarMusica(idOuvinte: number, idMusica: number): Promise<number> {
        const query = `
            INSERT INTO OuvinteTemMusicaAprovada
            VALUES (?, ?)
        `;

        return await this.database.query(query, [idOuvinte, idMusica]);
    }

    async removerMusica(idOuvinte: number, idMusica: number): Promise<void> {
        const query = `
            DELETE FROM OuvinteTemMusicaAprovada
            WHERE idOuvinte = ? AND idMusicaAprovada = ?
        `;

        await this.database.query(query, [idOuvinte, idMusica]);
    }
}