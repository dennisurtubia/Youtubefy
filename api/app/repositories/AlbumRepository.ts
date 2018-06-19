import { Inject, Service } from "typedi";
import Album from "../models/Album";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Album;

@Service()
export default class AlbumRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Entity | null> {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
            WHERE a.id = ?
        `;

        return await this.database.queryOne<Entity>(query, [id]);
    }

    async getAll(): Promise<Entity[]> {
        const query = `
            SELECT a.id, a.capa, a.nome, a.nomeArtista, a.descricao, a.idPublicadora
            FROM Album a
        `;

        return await this.database.queryAll<Entity>(query, [])
    }

    async add(object: Entity): Promise<void> {

        const query = `
            INSERT INTO Album
            VALUES (0, ?, ?, ?, ?, ?)
        `;

        await this.database.query(query, [object.capa, object.nome, object.nomeArtista, object.descricao, object.publicadora.id]);
    }

    async update(id: number, object: Entity): Promise<void> {

        const query1 = `
            UPDATE Album a
            SET a.capa = ?, a.nome = ?, a.nomeArtista = ?, a.descricao = ?, a.idPublicadora = ?
            WHERE a.id = ?
        `;

        await this.database.query(query1, [id, object.capa, object.nome, object.nomeArtista, object.descricao, object.publicadora.id]);
    }

    async delete(id: number): Promise<void> {
        const query = `
            DELETE FROM Album a
            WHERE a.id = ?
        `;

        await this.database.query(query, [id]);
    }
}
