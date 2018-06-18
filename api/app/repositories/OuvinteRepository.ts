import { Inject, Service } from "typedi";
import Ouvinte from "../models/Ouvinte";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Ouvinte;

@Service()
export default class OuvinteRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Entity | null> {
        const query = `
        SELECT a.id, a.cpf, u.nome, u.email, u.senha
        FROM Administrador a INNER JOIN Usuario u
        ON u.id = a.id
        AND a.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }


    async getAll(): Promise<Ouvinte[]> {
        throw new Error("Method not implemented.");
    }
    async add(object: Ouvinte): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async update(id: number, object: Ouvinte): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

