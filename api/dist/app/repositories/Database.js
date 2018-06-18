"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
require("reflect-metadata");
const typedi_1 = require("typedi");
let Database = class Database {
    async init() {
        this.connection = await promise_1.createConnection({
            host: "localhost",
            user: "fjorg",
            password: "1234",
            database: "ProjectBD"
        });
    }
    async queryOne(str, args) {
        if (this.connection == null) {
            await this.init();
        }
        const [rows] = await this.connection.execute(str, args).catch(e => { throw e; });
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    async queryAll(str, args) {
        if (this.connection == null) {
            await this.init();
        }
        const [rows] = await this.connection.execute(str, args).catch(e => { throw e; });
        return rows;
    }
    async query(str, args) {
        if (this.connection == null) {
            await this.init();
        }
        const result = await this.connection.execute(str, args).catch(e => { throw e; });
        return result["0"].insertId;
    }
};
Database = __decorate([
    typedi_1.Service()
], Database);
exports.default = Database;
//# sourceMappingURL=Database.js.map