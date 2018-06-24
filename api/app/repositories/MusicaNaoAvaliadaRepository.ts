import { Inject, Service } from "typedi";
import MusicaNaoAvaliada from "../models/MusicaNaoAvaliada";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = MusicaNaoAvaliada;

@Service()
export default class MusicaNaoAvaliadaRepository implements IRepository<Entity> {


    @Inject()
    database!: Database;

    async getByAdmin(id: number): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.idGenero, m.idAlbum
            FROM MusicaNaoAvaliada mn
            INNER JOIN Musica m ON m.id = mr.id
            WHERE mr.idAdministrador = ?
        `;

        return await this.database.queryAll<Entity>(query, [id]);
    }


    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.idGenero, m.idAlbum
            FROM MusicaNaoAvaliada mn
            INNER JOIN Musica m ON m.id = mr.id
            WHERE mr.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT m.id, m.nome, m.duracao, m.explicito, m.idGenero, m.idAlbum
            FROM MusicaNaoAvaliada mn
            INNER JOIN Musica m ON m.id = mr.id
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

        const query2 = `
            INSERT INTO MusicaNaoAvaliada
            VALUES (?);
        `;




        let insertId2 = await this.database.query(query2, [insertId]);
        console.log(insertId2);


        if (insertId2 === -1) {
            await this.database.query('DELETE FROM Musica WHERE id = ?', [insertId]);
            return -1;
        }

        return insertId;
    }

    async update(id: number, object: MusicaNaoAvaliada): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM MusicaNaoAvaliada
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
