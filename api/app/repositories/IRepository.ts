export default interface IRepository<T> {
    getById(id: number): Promise<T | null>;
    getAll(): Promise<T[]>;
    add(object: T): Promise<number>;
    update(id: number, object: T): Promise<void>;
    delete(id: number): Promise<void>;
}