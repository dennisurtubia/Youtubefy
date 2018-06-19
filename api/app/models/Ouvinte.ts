import Usuario from "./Usuario";

export default class Ouvinte extends Usuario {
    private _cpf: string = "";

    constructor(id: number, cpf: string, nome: string, email: string, senha: string) {
        super(id, nome, email, senha);
        this._cpf = cpf;
    }

    public get cpf(): string {
        return this._cpf;
    }
    public set cpf(value: string) {
        this._cpf = value;
    }
}