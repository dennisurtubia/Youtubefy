import { Inject, Service } from "typedi";
import Genero from "../models/Genero";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Genero;

@Service()
export default class GeneroRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getByAdmin(id: number): Promise<Entity[]> {

        const query = `
            SELECT g.id, g.nome, g.idAdministrador
            FROM Genero g
            WHERE g.idAdministrador = ?
        `;

        return await this.database.queryAll<Entity>(query, [id]);
    }

    async getById(id: number): Promise<Entity | null> {

        const query = `
            SELECT g.id, g.nome, g.idAdministrador
            FROM Genero g
            WHERE g.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT g.id, g.nome, g.idAdministrador
            FROM Genero g
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Genero
            VALUES (0, ?, ?)
        `;

        return await this.database.query(query1, [object.nome, object.idAdministrador]);
    }

    async update(id: number, object: Entity): Promise<void> {

        const query1 = `
            UPDATE Genero g
            SET g.nome = ?, g.idAdministrador = ?
            WHERE g.id = ?
        `;

        await this.database.query(query1, [object.nome, object.idAdministrador, id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM Genero
            WHERE id = ?
        `;

        await this.database.query(query, [id]);
    }
}
