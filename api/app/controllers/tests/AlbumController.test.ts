import { post, get } from "request-promise";
import * as faker from "faker/locale/pt_BR";


const emailAdmin = faker.internet.email();
const senha = "1234";
let tokenAdmin = '';

const emailPublicadora = faker.internet.email();
let tokenPublicadora = '';

beforeAll(async () => {

    await post('http://127.0.0.1:3000/v1/admin/signup', {
        json: {
            nome: faker.name.firstName(),
            email: emailAdmin,
            senha: senha,
            cpf: "11111111111"
        }
    })

    let res = await post('http://127.0.0.1:3000/v1/admin/signin', {
        json: {
            email: emailAdmin,
            senha: senha
        }
    });
    tokenAdmin = res.token;

    await post('http://127.0.0.1:3000/v1/publicadora/signup', {
        json: {
            nome: faker.name.firstName(),
            email: emailPublicadora,
            senha: senha,
            cnpj: "11111111111"
        }
    })

    res = await post('http://127.0.0.1:3000/v1/publicadora/signin', {
        json: {
            email: emailPublicadora,
            senha: senha
        }
    });
    tokenPublicadora = res.token;
});

describe('adicionar album', () => {

    const url = 'http://127.0.0.1:3000/v1/album';

    it('deve cadastrar um ambum com algumas musicas', async () => {

        // let res = await post('http://127.0.0.1:3000/v1/genero?token=' + tokenAdmin, {
        //     json: {
        //         nome: "Generroooo"
        //     }
        // });
        // expect(res.sucesso).toBeTruthy()

        // let generos = await get('http://127.0.0.1:3000/v1/genero/');
        // console.log(generos);



        let res = await post(url + '?token=' + tokenPublicadora, {
            json: {
                capa: faker.name.firstName(),
                nome: faker.name.firstName(),
                nomeArtista: faker.name.firstName(),
                descricao: faker.lorem.word(),
                musicas: [
                    {
                        nome: "musica",
                        duracao: 100,
                        explicito: false,
                        genero: 1
                    }
                ]
            }
        });

        res = await get('http://127.0.0.1:3000/v1/musica/naoavaliadas?token=' + tokenAdmin);
        console.log(res);
        

    })

});