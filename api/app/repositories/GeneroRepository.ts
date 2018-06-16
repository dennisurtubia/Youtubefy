import { Inject } from "typedi";
import Genero from "../models/Genero";
import Database from "./Database";

export default class GeneroRepository {

    @Inject()
    database!: Database;

    public async getAll(): Promise<Genero[]> {

        const query = `
        SELECT g.id, g.nome
        FROM Genero g
        `;

        return await this.database.query<Genero>(query, []);
    }

    public async insert(nome: string, idAdministrador: number) {

        const query = `
        INSERT INTO Genero
        VALUES (0, ?, ?)
        `;

        return await this.database.query<Genero>(query, [nome, idAdministrador]);
    }
}