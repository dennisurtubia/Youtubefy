import { Inject, Service } from "typedi";
import MusicaAprovada from "../models/Musica";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = MusicaAprovada;

@Service()
export default class GeneroRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT g.id, g.nome, g.administrador
            FROM Genero g
            WHERE g.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT g.id, g.nome, g.administrador
            FROM Genero g
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<void> {

        const query1 = `
            INSERT INTO Genero
            VALUES (0, ?, ?)
        `;

        await this.database.query(query1, [object.nome, object.administrador.id]);
    }

    async update(id: number, object: Entity): Promise<void> {

        const query1 = `
            UPDATE Genero g
            SET g.nome = ?, g.administrador = ?
            WHERE g.id = ?
        `;

        await this.database.query(query1, [object.nome, object.administrador.id, id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM Genero g
            WHERE g.id = ?
        `;

        await this.database.query(query, [id]);
    }
}
