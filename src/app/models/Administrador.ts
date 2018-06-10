import Usuario, { TipoUsuario } from "./Usuario";

export default class Administrador extends Usuario {
    private _cpf: string = "";

    constructor(cpf: string, nome: string) {
        super(nome, TipoUsuario.Administrador);
        this._cpf = cpf;
    }

    public get cpf(): string {
        return this._cpf;
    }
    public set cpf(value: string) {
        this._cpf = value;
    }
}