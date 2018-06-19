import { Inject, Service } from "typedi";
import Publicadora from "../models/Publicadora";
import Database from "./Database";
import IRepository from "./IRepository";

type Entity = Publicadora;

@Service()
export default class PublicadoraRepository implements IRepository<Entity> {

    @Inject()
    database!: Database;

    async getById(id: number): Promise<Publicadora | null> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<Publicadora[]> {
        throw new Error("Method not implemented.");
    }

    async add(object: Publicadora): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async update(id: number, object: Publicadora): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
