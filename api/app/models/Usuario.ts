export default class Usuario {
    private _id: number = 0;
    private _nome: string = "";
    private _email: string = "";
    private _senha: string = "";

    public constructor(id: number, nome: string, email: string, senha: string) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get senha(): string {
        return this._senha;
    }
    public set senha(value: string) {
        this._senha = value;
    }

    
}