import { post, get } from "request-promise";
import * as faker from "faker/locale/pt_BR";


const email = faker.internet.email();
const senha = "1234";
let token = '';

beforeAll(async () => {

    await post('http://127.0.0.1:3000/v1/admin/signup', {
        json: {
            nome: faker.name.firstName(),
            email: email,
            senha: senha,
            cpf: "11111111111"
        }
    })

    const res = await post('http://127.0.0.1:3000/v1/admin/signin', {
        json: {
            email: email,
            senha: senha
        }
    });
    token = res.token;
});

describe('signup', () => {

    const url = 'http://127.0.0.1:3000/v1/admin/signup';

    it('deve cadastrar corretamente', async () => {

        const res = await post(url, {
            json: {
                nome: faker.name.firstName(),
                email: faker.internet.email(),
                senha: "aaa",
                cpf: "11111111111"
            }
        });

        expect(res.sucesso).toBeTruthy();

    })

    it('deve retornar erro se faltarem campos', async () => {

        const res = await post(url, {
            json: {
                nome: faker.name.firstName(),
                email: faker.internet.email(),
                senha: "aaa",
                // cpf: "11111111111"
            }
        });

        expect(res.erro).toBe('ERRO_BODY');
    })

    it('deve retornar erro se campos forem inválidos', async () => {

        let res = await post(url, {
            json: {
                nome: faker.name.firstName(),
                email: faker.internet.email(),
                senha: "",
                cpf: "11111111111"
            }
        });

        expect(res.erro).toBe('ERRO_BODY');

        res = await post(url, {
            json: {
                nome: faker.name.firstName(),
                email: faker.internet.email(),
                senha: "123",
                cpf: "11111111111a"
            }
        });

        expect(res.erro).toBe('ERRO_BODY');
    })

    it('deve retornar erro se repetir o email', async () => {

        const email = faker.internet.email();

        let res = await post(url, {
            json: {
                nome: faker.name.firstName(),
                email: email,
                senha: "aaa",
                cpf: "11111111111"
            }
        });

        expect(res.sucesso).toBeTruthy();

        res = await post(url, {
            json: {
                nome: faker.name.firstName(),
                email: email,
                senha: "aaa",
                cpf: "11111111111"
            }
        });

        expect(res.erro).toBe('EMAIL_EXISTENTE');
    })
});




describe('signin', () => {
    const url = 'http://127.0.0.1:3000/v1/admin/signin';


    it('retorna um token se as informações estiverem corretas', async () => {

        const res = await post(url, {
            json: {
                email: email,
                senha: senha
            }
        });

        expect(res.token).not.toBeUndefined();
        expect(res.erro).not.toBe('INFORMACOES_INCORRETAS')
    });

    it('retorna erro se as informações estiverem incorretas', async () => {

        let res = await post(url, {
            json: {
                email: email,
                senha: senha + 'a'
            }
        });

        expect(res.erro).toBe('INFORMACOES_INCORRETAS')
        expect(res.token).toBeUndefined();

        res = await post(url, {
            json: {
                email: email + 'a',
                senha: senha
            }
        });

        expect(res.erro).toBe('INFORMACOES_INCORRETAS')
        expect(res.token).toBeUndefined();
    });

    it('retorna erro se as informações estiverem faltando', async () => {

        let res = await post(url, {
            json: {
                email: email
               
            }
        });

        expect(res.erro).toBe('ERRO_BODY')
        expect(res.token).toBeUndefined();


    });
});

describe('info', () => {
    const url = 'http://127.0.0.1:3000/v1/admin';

    it('retorna as informações se informar um token válido', async () => {

        const res = JSON.parse((await get(url, {
            qs: { token }
        })));

        expect(res.erro).not.toBe('ACESSO_NEGADO');
        expect(res.email).toBe(email);
    });

    it('retorna erro se o token for inválido', async () => {

        const res = JSON.parse((await get(url, {
            qs: { token: token + 'x' }
        })));

        expect(res.erro).toBe('ACESSO_NEGADO');
        expect(res.email).toBeUndefined();
    });

});