import { Inject, Service } from "typedi";
import Usuario from "../models/Usuario";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Usuario;

@Service()
export default class UsuarioRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getByEmail(email: string): Promise<Entity | null> {
        const query = `
            SELECT a.email
            FROM Administrador a
            WHERE a.email = ?
        `;

        return await this.database.queryOne<Entity>(query, [email]);
    }

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT u.id, u.nome, u.email, u.senha
            FROM Usuario u
            WHERE u.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {
        const query = `
            SELECT u.id, u.nome, u.email, u.senha
            FROM Usuario u
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<number> {

        const query1 = `
            INSERT INTO Usuario
            VALUES (0, ?, ?, ?)
        `;

        let insertId = await this.database.query(query1, [object.nome, object.email, object.senha]);

        if (insertId === -1) {
            return -1;
        }
        return insertId;
    }

    async update(id: number, object: Entity): Promise<void> {

        const query2 = `
            UPDATE Usuario u
            SET u.nome = ?, u.email = ?, u.senha = ?
            WHERE u.id = ?
        `;

        await this.database.query(query2, [object.nome, object.email, object.senha, id]);
    }

    async delete(id: number): Promise<void> {

        const query2 = `
            DELETE FROM Usuario
            WHERE id = ?
        `;
        await this.database.query(query2, [id]);
    }
}
