import { Inject, Service } from "typedi";
import MusicaAprovada from "../models/MusicaAprovada";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = MusicaAprovada;

@Service()
export default class MusicaAprovadaRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getByGenero(id: number): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE m.idGenero = ?
        `;

        return await this.database.queryAll<Entity>(query, [id]);
    }

    async getByAlbum(id: number): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE m.idAlbum = ?
        `;

        return await this.database.queryAll<Entity>(query, [id]);
    }

    async getByAdmin(id: number): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE ma.idAdministrador = ?
        `;

        return await this.database.queryAll<Entity>(query, [id]);
    }


    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
            WHERE m.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, ma.dataAprov, ma.plays, ma.idAdministrador
            FROM MusicaAprovada ma
            INNER JOIN Musica m ON m.id = ma.id
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Musica
            VALUES (0, ?, ?, ?, ?, ?, ?)
        `;

        let insertId = await this.database.query(query1, [object.nome, object.duracao, object.explicito, object.url, object.idGenero, object.idAlbum]);

        if (insertId === -1)
            return -1;

        const query2 = `
            INSERT INTO MusicaAprovada
            VALUES (?, ?, ?, ?);
        `;

        let insertId2 = await this.database.query(query2, [insertId, object.dataAprov, object.plays, object.idAdministrador]);

        if (insertId2 === -1) {
            await this.database.query('DELETE FROM Musica WHERE id = ?', [insertId]);
            return -1;
        }

        return insertId;
    }

    async update(id: number, object: MusicaAprovada): Promise<void> {
        const query = `
            UPDATE MusicaAprovada ma
            SET ma.dataAprov = ?, ma.plays = ?
            WHERE ma.id = ?
        `;

        await this.database.query(query, [object.dataAprov, object.plays, id]);

        const query2 = `
            UPDATE Musica m
            SET m.nome = ?, m.duracao = ?, m.explicito = ?, m.url = ?, m.idGenero = ?, m.idAlbum = ?
            WHERE m.id = ?
        `;

        await this.database.query(query2, [object.nome, object.duracao, object.explicito, object.url, object.idGenero, object.idAlbum, id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM MusicaAprovada
            WHERE id = ?
        `;

        await this.database.query(query, [id]);

        const query2 = `
            DELETE FROM Musica
            WHERE id = ?
        `;

        await this.database.query(query2, [id]);
    }
}
