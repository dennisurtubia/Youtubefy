import { INomeIdadeAluno } from "../criteria/AlunoCriteria";
import { Aluno } from "../models/Aluno";
import Database from "./database";



export default class AlunoRepository {
    constructor(private database: Database) {

    }

    public async getAll(): Promise<Aluno[]> {

        const rows: Aluno[] = await this.database.query<Aluno>('select * from ALUNO');
        return rows;
    }

    public async getNomeIdade() : Promise<INomeIdadeAluno[]> {
        const rows: INomeIdadeAluno[] = await this.database.query<INomeIdadeAluno>('select nomeAlun, idade from ALUNO');
        return rows;
    }
}