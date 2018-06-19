export default class Playlist {
    private _id: number = 0;
    private _nome: string = "";

    constructor(id: number, nome: string){
        this._id = id;
        this._nome = nome;
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
}