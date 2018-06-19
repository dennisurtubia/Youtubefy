import { Inject, Service } from "typedi";
import Genero from "../models/Genero";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Genero;

@Service()
export default class GeneroRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;
    
    async getById(id: number): Promise<Entity | null> {

        const query = `
            SELECT g.id, g.nome, g.idAdministrador as administrador
            FROM Genero g
            WHERE g.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {

        const query = `
            SELECT g.id, g.nome, g.idAdministrador as administrador
            FROM Genero g
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Genero
            VALUES (0, ?, ?)
        `;

        return await this.database.query(query1, [object.nome, object.administrador]);
    }

    async update(id: number, object: Entity): Promise<void> {

        const query1 = `
            UPDATE Genero g
            SET g.nome = ?, g.idAdministrador = ?
            WHERE g.id = ?
        `;
        console.log(object.nome);
        
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
