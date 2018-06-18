export default interface IRepository<T> {
    getById(id: number): Promise<T | null>;
    getAll(): Promise<T[]>;
    add(object: T): Promise<void>;
    update(id: number, object: T): Promise<void>;
    delete(id: number): Promise<void>;
}