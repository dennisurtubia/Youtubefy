import { Connection, createConnection, RowDataPacket } from 'mysql2/promise';
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
            database: "lista3"
        });
    }

    public async query<T>(str: string): Promise<T[]> {

        if (this.connection == null) {
            console.log('test');
            await this.init();
        }

        const [rows] = await this.connection.execute(str);
        return rows;
    }
}

// Só para parar os warnings
Container.get(Database);