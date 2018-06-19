import Usuario from "./Usuario";

export default class Publicadora extends Usuario {
    private _cnpj: string = "";

    constructor(id: number, cnpj: string, nome: string, email: string, senha: string) {
        super(id, nome, email, senha);
        this._cnpj = cnpj;
    }
    public get cnpj(): string {
        return this._cnpj;
    }
    public set cnpj(value: string) {
        this._cnpj = value;
    }
}