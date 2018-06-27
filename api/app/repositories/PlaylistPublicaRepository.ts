import { Service, Inject } from "typedi";
import IRepository from "./IRepository";
import Database from "./Database";
import PlaylistPublica from "../models/PlaylistPublica"
import Playlist from "../models/Playlist";

type Entity = PlaylistPublica;

@Service()
export default class PlaylistPublicaRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Entity[]>{

        const query = `
            SELECT p.nome
            FROM Playlist as p, PlaylistPublica as p1
            WHERE p.id = p1.id and
            p1.id = ?
        `;
        return await this.database.queryOne<Entity>(query, [id]);
    }
    async getAll(): Promise<Entity[]> {
        const query = `
            SELECT p.nome
            FROM Playlist as p, PlaylistPublica as p1
            WHERE p.id = p1.id and
        `;

        return await this.database.queryAll<Entity>(query, [])
    }
    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Playlist
            VALUES (0, ?)
        `;
        let insertId = await this.database.query(query1, [object.nome]);

        if (insertId === -1)
            return -1;

        const query2 = `
            INSERT INTO PlaylistPublica
            VALUES (0, 0)
        `;        
        let insertId2 = await this.database.query(query2, []);

        if(insertId2 === -1)
            return -1;
    }
    async update(id: number, object: Playlist): Promise<void> {

        const query = `
            UPDATE Playlist p
            SET p.nome = ?
            WHERE p.id = ?
        `;
        await this.database.query(query, [object.nome, id]);
    }
    async delete(id:number): Promise<void> {
        const query1 = `
            DELETE FROM Playlist
            WHERE id = ?
        `;
        await this.database.query(query1, [id]);

        const query2 = `
            DELETE FROM PlaylistPublica
            WHERE id = ?
        `;
        await this.database.query(query2, [id]);
    }
}