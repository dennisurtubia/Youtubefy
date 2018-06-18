import { Connection, createConnection, FieldPacket, OkPacket } from 'mysql2/promise';
import "reflect-metadata";
import { Service } from "typedi";

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

    public async queryOne<T>(str: string, args: any): Promise<T | null> {

        if (this.connection == null) {
            await this.init();
        }

        const [rows] = await this.connection.execute(str, args).catch(e => { throw e });
        if ((rows as T[]).length > 0) {
            return (rows as T[])[0] as T;
        }
        return null;
    }

    public async queryAll<T>(str: string, args: any): Promise<T[]> {

        if (this.connection == null) {
            await this.init();
        }

        const [rows] = await this.connection.execute(str, args).catch(e => { throw e });
    
        return rows as T[];
    }

    public async query(str: string, args: any): Promise<number> {
        if (this.connection == null) {
            await this.init();
        }
        const result: [OkPacket, FieldPacket[]] = await this.connection.execute<OkPacket>(str, args).catch(e => { throw e });
        return result["0"].insertId;
    }
}