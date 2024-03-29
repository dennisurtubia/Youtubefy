import { Inject, Service } from "typedi";
import Publicadora from "../models/Publicadora";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Publicadora;

@Service()
export default class PublicadoraRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;


    async getByEmail(email: string): Promise<Entity | null> {
        const query = `
            SELECT u.id, p.cnpj, u.nome, u.email, u.senha
            FROM Publicadora p INNER JOIN Usuario u
            ON u.id = p.id
            AND u.email = ?
        `;

        return await this.database.queryOne<Entity>(query, [email]);
    }

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT a.id, a.cnpj, u.nome, u.email, u.senha
            FROM Publicadora a INNER JOIN Usuario u
            ON u.id = a.id
            AND a.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {
        const query = `
            SELECT a.id, a.cnpj, u.nome, u.email, u.senha
            FROM Publicadora a INNER JOIN Usuario u
            ON u.id = a.id
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Usuario
            VALUES (0, ?, ?, ?)
        `;

        let insertId = await this.database.query(query1, [object.nome, object.email, object.senha]);

        if (insertId === -1)
            return -1;

        const query2 = `
            INSERT INTO Publicadora
            VALUES (?, ?)
        `;

        let insertId2 = await this.database.query(query2, [insertId, object.cnpj]);

        if (insertId2 === -1) {
            await this.database.query('DELETE FROM Usuario WHERE id = ?', [insertId]);
            return -1;
        }

        return insertId;
    }

    async update(id: number, object: Publicadora): Promise<void> {

        const query1 = `
            UPDATE Publicadora a
            SET a.cnpj = ?
            WHERE a.id = ?
        `;

        await this.database.query(query1, [object.cnpj, id]);

        const query2 = `
            UPDATE Usuario u 
            SET u.nome = ?, u.email = ?, u.senha = ?
            WHERE u.id = ?

        `;
        await this.database.query(query2, [object.nome, object.email, object.senha, id]);
    }

    async delete(id: number): Promise<void> {

        const query = `
            DELETE FROM Publicadora
            WHERE id = ?
        `;
        await this.database.query(query, [id]);

        const query2 = `
            DELETE FROM Usuario
            WHERE id = ?
        `;
        await this.database.query(query2, [id]);
    }
}