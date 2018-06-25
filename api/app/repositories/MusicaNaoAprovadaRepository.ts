import { Inject, Service } from "typedi";
import MusicaNaoAprovada from "../models/MusicaNaoAprovada";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = MusicaNaoAprovada;

@Service()
export default class MusicNaoaAprovadaRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getByAdmin(id: number): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, mr.dataReprov, mr.observacao, mr.idAdministrador
            FROM MusicaNaoAprovada mr
            INNER JOIN Musica m ON m.id = mr.id
            WHERE mr.idAdministrador = ?
        `;

        return await this.database.queryAll<Entity>(query, [id]);
    }


    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, mr.dataReprov, mr.observacao, mr.idAdministrador
            FROM MusicaNaoAprovada mr
            INNER JOIN Musica m ON m.id = mr.id
            WHERE mr.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.url, m.idGenero, m.idAlbum, mr.dataReprov, mr.observacao, mr.idAdministrador
            FROM MusicaNaoAprovada mr
            INNER JOIN Musica m ON m.id = mr.id
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
            INSERT INTO MusicaNaoAprovada
            VALUES (?, ?, ?, ?);
        `;

        let insertId2 = await this.database.query(query2, [insertId, object.dataReprov, object.observacao, object.idAdministrador]);

        if (insertId2 === -1) {
            await this.database.query('DELETE FROM Musica WHERE id = ?', [insertId]);
            return -1;
        }

        return insertId;
    }

    async update(id: number, object: MusicaNaoAprovada): Promise<void> {
        const query = `
            UPDATE MusicaNaoAprovada mr
            SET mr.dataReprov = ?, mr.observacao = ?
            WHERE mr.id = ?
        `;

        await this.database.query(query, [object.dataReprov, object.observacao, id]);

        const query2 = `
            UPDATE Musica m
            SET m.nome = ?, m.duracao = ?, m.explicito = ?, m.url = ?, m.idGenero = ?, m.idAlbum = ?
            WHERE m.id = ?
        `;

        await this.database.query(query2, [object.nome, object.duracao, object.explicito, object.url, object.idGenero, object.idAlbum, id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM MusicaNaoAprovada
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
