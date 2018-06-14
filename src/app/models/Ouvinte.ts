export default class Ouvinte {
    private _id: number = 0;
    private _cpf: string = "";

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get cpf(): string {
        return this._cpf;
    }
    public set cpf(value: string) {
        this._cpf = value;
    }
}