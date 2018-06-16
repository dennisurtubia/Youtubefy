import { Connection, createConnection } from 'mysql2/promise';
import "reflect-metadata";
import { Container, Service } from "typedi";

@Service()
export default class Database {
    private connection!: Connection;

    private async init() {
        this.connection = await createConnection({
            host: "localhost",
            user: "fjorg",
            password: "1234",
            database: "ProjectBD"
        });
    }

    public async query<T>(str: string, args: any): Promise<T[]> {

        if (this.connection == null) {
            await this.init();
        }

        const [rows] = await this.connection.execute(str, args).catch(e => { throw e });
        return rows;
    }
}

// Só para parar os warnings
Container.get(Database);