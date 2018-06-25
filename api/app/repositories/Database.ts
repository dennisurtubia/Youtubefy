import { Connection, createConnection, FieldPacket, OkPacket } from 'mysql2/promise';
import "reflect-metadata";
import { Service } from "typedi";

@Service()
export default class Database {
    public connection!: Connection;

    private async init() {
        this.connection = await createConnection({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "fjorg",
            password: process.env.MYSQL_ROOT_PASSWORD || "1234",
            database: process.env.DATABASE || "ProjectBD"
        });
    }

    public async disconnect() {
        await this.connection.end();
        await this.connection.destroy();
    }

    public async queryOne<T>(str: string, args: any): Promise<T | null> {

        if (this.connection == null) {
            await this.init();
        }

        try {
            const [rows] = await this.connection.execute(str, args).catch(e => { throw e });
            if ((rows as T[]).length > 0) {
                return (rows as T[])[0] as T;
            }
            return null;
        } catch (err) {
            return null;
        }

    }

    public async queryAll<T>(str: string, args: any): Promise<T[]> {

        if (this.connection == null) {
            await this.init();
        }

        try {
            const [rows] = await this.connection.execute(str, args).catch(e => { throw e });

            return rows as T[];
        } catch (err) {
            return [];
        }

    }

    public async query(str: string, args: any): Promise<number> {
        if (this.connection == null) {
            await this.init();
        }

        try {
            const result: [OkPacket, FieldPacket[]] = await this.connection.execute<OkPacket>(str, args).catch(e => { throw e });
            console.log(str);
            console.log(result);
            
            return result["0"].insertId;
        } catch (err) {
            return -1;
        }
    }
}