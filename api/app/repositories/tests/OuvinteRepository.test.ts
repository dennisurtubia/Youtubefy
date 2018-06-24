import { Container } from "typedi";
import Ouvinte from "../../models/Ouvinte";
import OuvinteRepository from "../OuvinteRepository";
import Database from "../Database";
import UsuarioRepository from "../UsuarioRepository";

const database = Container.get(Database);
const ouvinteRepository = Container.get(OuvinteRepository);
const usuarioRepository = Container.get(UsuarioRepository);

beforeEach(async () => {
    await database.query('DELETE FROM Ouvinte', []);
    await database.query('DELETE FROM Usuario', []);
})

test('adiciona alguns ouvintes', async () => {
    let usuarios = await usuarioRepository.getAll();
    let ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(ouvintes.length).toBe(0);

    let insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "aaa", "a@a.com", "senha"));
    expect(insertId).toBeGreaterThan(0);

    ouvintes = await ouvinteRepository.getAll();
    usuarios = await usuarioRepository.getAll();

    expect(ouvintes.length).toBe(1);
    expect(usuarios.length).toBe(1);

    insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "aaa", "b@a.com", "senha"));
    expect(insertId).toBeGreaterThan(0);

    usuarios = await usuarioRepository.getAll();
    ouvintes = await ouvinteRepository.getAll();

    expect(ouvintes.length).toBe(2);
    expect(usuarios.length).toBe(2);

});

test('adiciona um ouvinte e pega informações pelo email', async () => {
    let usuarios = await usuarioRepository.getAll();
    let ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(ouvintes.length).toBe(0);

    const insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);

    usuarios = await usuarioRepository.getAll();
    ouvintes = await ouvinteRepository.getAll();

    expect(usuarios.length).toBe(1);
    expect(ouvintes.length).toBe(1);

    const ouvinte = await ouvinteRepository.getByEmail("a@a.com");
    expect(ouvinte).not.toBeNull();
    expect(ouvinte.cpf).toBe("cpf");
    expect(ouvinte.nome).toBe("nome");
    expect(ouvinte.email).toBe("a@a.com");
    expect(ouvinte.senha).toBe("senha");
});

test('adiciona um ouvinte e pega informações pelo id', async () => {
    let usuarios = await usuarioRepository.getAll();
    let ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(ouvintes.length).toBe(0);

    const insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);

    usuarios = await usuarioRepository.getAll();
    ouvintes = await ouvinteRepository.getAll();

    expect(usuarios.length).toBe(1);
    expect(ouvintes.length).toBe(1);

    const ouvinte = await ouvinteRepository.getById(insertId);
    expect(ouvinte).not.toBeNull();
    expect(ouvinte.cpf).toBe("cpf");
    expect(ouvinte.nome).toBe("nome");
    expect(ouvinte.email).toBe("a@a.com");
    expect(ouvinte.senha).toBe("senha");
});

test('não adiciona ouvinte com email repetido', async () => {
    let insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);
    insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).toBe(-1);

    let usuarios = await usuarioRepository.getAll();
    let ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(1);
    expect(ouvintes.length).toBe(1);
});

test('apaga usuário se não adicionar o ouvinte', async () => {
    let insertId = await ouvinteRepository.add(new Ouvinte(0, "cpfhgggggggggggggggggggggggggggggggggg", "nome", "a@a.com", "senha"));
    expect(insertId).toBe(-1);
    let usuarios = await usuarioRepository.getAll();
    let ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(ouvintes.length).toBe(0);
});

test('lista todos os ouvintees', async () => {
    let usuarios = await usuarioRepository.getAll();
    let ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(ouvintes.length).toBe(0);
    await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "b@a.com", "senha"));
    await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "c@a.com", "senha"));
    await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "d@a.com", "senha"));
    await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "e@a.com", "senha"));
    await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "f@a.com", "senha"));
    usuarios = await usuarioRepository.getAll();
    ouvintes = await ouvinteRepository.getAll();
    expect(usuarios.length).toBe(6);
    expect(ouvintes.length).toBe(6);
});

test('atualiza informações ouvinte', async () => {
    const insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    let ouvinte = await ouvinteRepository.getById(insertId);
    expect(ouvinte.cpf).toBe("cpf");
    expect(ouvinte.nome).toBe("nome");
    expect(ouvinte.senha).toBe("senha");
    ouvinte.cpf = "novocpf";
    ouvinte.nome = "novonome";
    ouvinte.senha = "novasenha";
    await ouvinteRepository.update(insertId, ouvinte);
    ouvinte = await ouvinteRepository.getById(insertId);
    expect(ouvinte.cpf).toBe("novocpf");
    expect(ouvinte.nome).toBe("novonome");
    expect(ouvinte.senha).toBe("novasenha");
});

test('remove um ouvinte', async () => {
    const insertId = await ouvinteRepository.add(new Ouvinte(0, "cpf", "nome", "a@a.com", "senha"));
    let ouvinte = await ouvinteRepository.getById(insertId);
    expect(ouvinte).not.toBeNull();
    await ouvinteRepository.delete(insertId);
    ouvinte = await ouvinteRepository.getById(insertId);
    expect(ouvinte).toBeNull();
});

afterAll(async () => {
    await database.disconnect();
});