import * as faker from "faker/locale/pt_BR";
import { Container } from "typedi";
import Administrador from "../../models/Administrador";
import Genero from "../../models/Genero";
import AdminRepository from "../AdminRepository";
import Database from "../Database";
import GeneroRepository from "../GeneroRepository";
const adminRepository = Container.get(AdminRepository);

const database = Container.get(Database);
const generoRepository = Container.get(GeneroRepository)

beforeEach(async () => {
    await database.query('DELETE FROM Administrador', []);
    await database.query('DELETE FROM Usuario', []);
    await database.query('DELETE FROM Genero', []);
})

it('insere alguns gêneros', async () => {
    const adminId = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    expect(adminId).not.toBe(-1)

    let generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let insertId = await generoRepository.add(new Genero(0, "asdfasdf", adminId))
        expect(insertId).not.toBe(-1)
    }

    generos = await generoRepository.getAll()
    expect(generos.length).toBe(100)
})

it('retorna erro se faltarem informações', async () => {
    const adminId = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    expect(adminId).not.toBe(-1)

    let generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let insertId = await generoRepository.add(new Genero(0, null, adminId))
        expect(insertId).toBe(-1)
    }

    generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)
})

it('retorna erro o admin for inválido', async () => {
    const adminId = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    expect(adminId).not.toBe(-1)

    let generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let insertId = await generoRepository.add(new Genero(0, "asdf", 100))
        expect(insertId).toBe(-1)
    }

    generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)
})


it('recebe algumas informações', async () => {
    const adminId = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    expect(adminId).not.toBe(-1)

    let generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let name = faker.lorem.word()
        let insertId = await generoRepository.add(new Genero(0, name, adminId))
        expect(insertId).not.toBe(-1)

        let genero = await generoRepository.getById(insertId)
        expect(genero).not.toBeNull()
        expect(genero.id).toBe(insertId)
        expect(genero.nome).toBe(name)
        expect(genero.idAdministrador).toBe(adminId)

        let invalido = await generoRepository.getById(643)
        expect(invalido).toBeNull()
    }

    generos = await generoRepository.getAll()
    expect(generos.length).toBe(100)

    let invalido = await generoRepository.getById(643)
    expect(invalido).toBeNull()
})

it('atualiza algumas informações', async () => {
    const adminId = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    expect(adminId).not.toBe(-1)

    let generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let name = faker.lorem.word()
        let insertId = await generoRepository.add(new Genero(0, name, adminId))
        expect(insertId).not.toBe(-1)

        let genero = await generoRepository.getById(insertId)
        expect(genero).not.toBeNull()
        expect(genero.id).toBe(insertId)
        expect(genero.nome).toBe(name)
        expect(genero.idAdministrador).toBe(adminId)

        let _name = faker.lorem.word()
        await generoRepository.update(insertId, new Genero(0, _name, adminId))
        genero = await generoRepository.getById(insertId)
        expect(genero.nome).toBe(_name)
    }

    generos = await generoRepository.getAll()
    expect(generos.length).toBe(100)
})

it('apaga alguns albuns', async () => {
    const adminId = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    expect(adminId).not.toBe(-1)

    let generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let name = faker.lorem.word()
        let insertId = await generoRepository.add(new Genero(0, name, adminId))
        expect(insertId).not.toBe(-1)

        await generoRepository.delete(insertId)
    }

    generos = await generoRepository.getAll()
    expect(generos.length).toBe(0)
})

it('recebe generos do admin', async () => {
    let admin1 = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "a@a.com", "1234"))
    let admin2 = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "b@a.com", "1234"))
    let admin3 = await adminRepository.add(new Administrador(0, "11111111111", "ademir", "c@a.com", "1234"))
    expect(admin1).not.toBe(-1)
    expect(admin2).not.toBe(-1)
    expect(admin3).not.toBe(-1)

    let generos_admin1 = []
    generos_admin1.push(await generoRepository.add(new Genero(0, "a", admin1)))
    generos_admin1.push(await generoRepository.add(new Genero(0, "b", admin1)))
    generos_admin1.push(await generoRepository.add(new Genero(0, "c", admin1)))
    generos_admin1.push(await generoRepository.add(new Genero(0, "d", admin1)))
    generos_admin1.push(await generoRepository.add(new Genero(0, "e", admin1)))
    generos_admin1.push(await generoRepository.add(new Genero(0, "f", admin1)))
    generos_admin1.push(await generoRepository.add(new Genero(0, "g", admin1)))

    let generos_admin2 = []
    generos_admin2.push(await generoRepository.add(new Genero(0, "x", admin2)))
    generos_admin2.push(await generoRepository.add(new Genero(0, "y", admin2)))

    let generos_admin3 = []

    const test_admin1 = await generoRepository.getByAdmin(admin1)
    expect(test_admin1.length).toBe(generos_admin1.length)
    expect(test_admin1.map((el) => el.nome)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    expect(test_admin1.every((el) => el.idAdministrador === admin1)).toBeTruthy()

    const test_admin2 = await generoRepository.getByAdmin(admin2)
    expect(test_admin2.length).toBe(generos_admin2.length)
    expect(test_admin2.map((el) => el.nome)).toEqual(['x', 'y'])
    expect(test_admin2.every((el) => el.idAdministrador === admin2)).toBeTruthy()

    const test_admin3 = await generoRepository.getByAdmin(admin3)
    expect(test_admin3.length).toBe(generos_admin3.length)
    expect(test_admin3.map((el) => el.nome)).toEqual([])
    expect(test_admin3.every((el) => el.idAdministrador === admin3)).toBeTruthy()
})

afterAll(async () => {
    await database.disconnect();
});