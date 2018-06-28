import { Inject, Service } from "typedi";
import Album from "../models/Album";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Album;

@Service()
export default class AlbumRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getByPublicadora(id: number): Promise<Entity[]> {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
            WHERE a.idPublicadora = ?
        `;

        return await this.database.queryAll<Entity>(query, [id])
    }

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
            WHERE a.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            INNER JOIN Musica m ON m.idAlbum = a.id
            INNER JOIN MusicaAprovada ma ON ma.id = m.id
            HAVING COUNT(ma.id) > 0
            FROM Album a
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query = `
            INSERT INTO Album
            VALUES (0, ?, ?, ?, ?, ?)
        `;

        return await this.database.query(query, [object.capa, object.nome, object.nomeArtista, object.descricao, object.idPublicadora]);
    }

    async update(id: number, object: Entity): Promise<void> {

        const query1 = `
            UPDATE Album a
            SET a.capa = ?, a.nome = ?, a.nomeArtista = ?, a.descricao = ?
            WHERE a.id = ?
        `;

        await this.database.query(query1, [object.capa, object.nome, object.nomeArtista, object.descricao, id]);
    }

    async delete(id: number): Promise<void> {

        const query1 = `
            DELETE FROM MusicaAprovada
            WHERE idAlbum = ?
        `;
        await this.database.query(query1, [id]);

        const query2 = `
            DELETE FROM MusicaNaoAprovada
            WHERE idAlbum = ?
        `;
        await this.database.query(query2, [id]);

        const query3 = `
            DELETE FROM MusicaNaoAvaliada
            WHERE idAlbum = ?
        `;
        await this.database.query(query3, [id]);

        const query4 = `
            DELETE FROM Musica
            WHERE idAlbum = ?
        `;
        await this.database.query(query4, [id]);

        const query5 = `
            DELETE FROM Album
            WHERE id = ?
        `;
        await this.database.query(query5, [id]);
    }
}
