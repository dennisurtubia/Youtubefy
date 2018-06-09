
export interface IAluno {
    nroAlun: number,
    nomeAlun: string,
    formacao: string,
    nivel: string,
    idade: number
}
export class Aluno {
    private nroAlun: number = 0;
    private nomeAlun: string = "";
    private formacao: string = "";
    private nivel: string = "";
    private idade: number = 0;
}