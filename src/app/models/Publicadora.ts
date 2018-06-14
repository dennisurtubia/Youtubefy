export default class Publicadora {
    private _id: number = 0;
    private _cnpj: string = "";

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get cnpj(): string {
        return this._cnpj;
    }
    public set cnpj(value: string) {
        this._cnpj = value;
    }
}