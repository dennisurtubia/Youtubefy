
import  Usuario  from "../models/Usuario";
import Database from "./Database";



export default class UsuarioRepository {

    constructor(private database: Database) {

    }

    public async getAll(): Promise<Usuario[]> {

        const rows: Usuario[] = await this.database.query<Usuario>('select * from ALUNO');
        return rows;
    }

   
}