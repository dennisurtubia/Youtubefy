import { Inject, Service } from "typedi";
import Musica from "../models/Musica";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Musica;

@Service()
export default class MusicaRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.idGenero, m.idAlbum
            FROM Musica m
            WHERE m.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.idGenero, m.idAlbum
            FROM Musica m
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Musica
            VALUES (0, ?, ?, ?, ?, ?)
        `;

        let insertId = await this.database.query(query1, [object.nome, object.duracao, object.explicito, object.idGenero, object.idAlbum]);

        if (insertId === -1)
            return -1;

        return insertId;
    }

    async update(id: number, object: Musica): Promise<void> {

        const query2 = `
            UPDATE Musica m
            SET m.nome = ?, m.duracao = ?, m.explicito = ?, m.idGenero = ?, m.idAlbum = ?
            WHERE m.id = ?
        `;

        await this.database.query(query2, [object.nome, object.duracao, object.explicito, object.idGenero, object.idAlbum, id]);
    }

    async delete(id: number): Promise<void> {

        const query2 = `
            DELETE FROM Musica
            WHERE id = ?
        `;

        await this.database.query(query2, [id]);
    }
}
