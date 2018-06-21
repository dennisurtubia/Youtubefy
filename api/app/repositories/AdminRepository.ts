import { Inject, Service } from "typedi";
import Administrador from "../models/Administrador";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Administrador;

@Service()
export default class AdminRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getByEmail(email: string): Promise<Entity | null> {
        const query = `
            SELECT a.id, a.cpf, u.nome, u.email, u.senha
            FROM Administrador a INNER JOIN Usuario u
            ON u.id = a.id
            AND u.email = ?
        `;

        return await this.database.queryOne<Entity>(query, [email]);
    }

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT a.id, a.cpf, u.nome, u.email, u.senha
            FROM Administrador a INNER JOIN Usuario u
            ON u.id = a.id
            AND a.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {
        const query = `
            SELECT a.id, a.cpf, u.nome, u.email, u.senha
            FROM Administrador a INNER JOIN Usuario u
            ON u.id = a.id
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Usuario
            VALUES (0, ?, ?, ?)
        `;

        const insertId = await this.database.query(query1, [object.nome, object.email, object.senha]);

        if (insertId === -1)
            return -1;

        const query2 = `
            INSERT INTO Administrador
            VALUES (?, ?)
        `;

        return await this.database.query(query2, [insertId, object.cpf]);
    }

    async update(id: number, object: Entity): Promise<void> {

        const query1 = `
            UPDATE Administrador a
            SET a.cpf = ?
            WHERE a.id = ?
        `;

        await this.database.query(query1, [object.cpf, id]);

        const query2 = `
            UPDATE Usuario u
            SET u.nome = ?, u.email = ?, u.senha = ?
            WHERE u.id = ?
        `;

        await this.database.query(query2, [object.nome, object.email, object.senha, id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM Administrador
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
