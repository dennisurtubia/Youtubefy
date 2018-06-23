import { Inject, Service } from "typedi";
import MusicaNaoAvaliada from "../models/MusicaNaoAvaliada";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = MusicaNaoAvaliada;

@Service()
export default class MusicaNaoAvaliadaRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito
            FROM MusicaNaoAvaliada m
            WHERE m.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito
            FROM MusicaNaoAvaliada m
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Musica
            VALUES (0, ?, ?, ?, ?)
        `;

        const insertId = await this.database.query(query1, [object.nome, object.duracao, object.explicito, object.idGenero]);

        const query2 = `
            INSERT INTO MusicaNaoAvaliada
            VALUES (?);
        `;

        return await this.database.query(query2, [insertId]);
    }

    async update(id: number, object: MusicaNaoAvaliada): Promise<void> {
        const query = `
            UPDATE MusicaNaoAvaliada m
            SET m.nome = ?, m.duracao = ?, m.explicito = ?
            WHERE m.id = ?
        `;

        await this.database.query(query, [object.nome, object.duracao, object.explicito, id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM MusicaNaoAvaliada m
            WHERE m.id = ?
        `;

        await this.database.query(query, [id]);

        const query2 = `
            DELETE FROM Musica m
            WHERE m.id = ?
        `;

        await this.database.query(query2, [id]);
    }
}
