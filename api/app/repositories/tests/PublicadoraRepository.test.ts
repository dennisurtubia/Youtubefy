import { Container } from "typedi";
import Publicadora from "../../models/Publicadora";
import PublicadoraRepository from "../PublicadoraRepository";
import Database from "../Database";
import UsuarioRepository from "../UsuarioRepository";

const database = Container.get(Database);
const publicadoraRepository = Container.get(PublicadoraRepository);
const usuarioRepository = Container.get(UsuarioRepository);

beforeEach(async () => {
    await database.query('DELETE FROM Publicadora', []);
    await database.query('DELETE FROM Usuario', []);
})

test('adiciona algumas publicadoras', async () => {
    let usuarios = await usuarioRepository.getAll();
    let publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(publicadoras.length).toBe(0);

    let insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "aaa", "a@a.com", "senha"));
    expect(insertId).toBeGreaterThan(0);

    publicadoras = await publicadoraRepository.getAll();
    usuarios = await usuarioRepository.getAll();

    expect(publicadoras.length).toBe(1);
    expect(usuarios.length).toBe(1);

    insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "aaa", "b@a.com", "senha"));
    expect(insertId).toBeGreaterThan(0);

    usuarios = await usuarioRepository.getAll();
    publicadoras = await publicadoraRepository.getAll();

    expect(publicadoras.length).toBe(2);
    expect(usuarios.length).toBe(2);

});

test('adiciona uma publicadora e pega informações pelo email', async () => {
    let usuarios = await usuarioRepository.getAll();
    let publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(publicadoras.length).toBe(0);

    const insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);

    usuarios = await usuarioRepository.getAll();
    publicadoras = await publicadoraRepository.getAll();

    expect(usuarios.length).toBe(1);
    expect(publicadoras.length).toBe(1);

    const admin = await publicadoraRepository.getByEmail("a@a.com");
    expect(admin).not.toBeNull();
    expect(admin.cnpj).toBe("cnpj");
    expect(admin.nome).toBe("nome");
    expect(admin.email).toBe("a@a.com");
    expect(admin.senha).toBe("senha");
});

test('adiciona uma publicadora e pega informações pelo id', async () => {
    let usuarios = await usuarioRepository.getAll();
    let publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(publicadoras.length).toBe(0);

    const insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);

    usuarios = await usuarioRepository.getAll();
    publicadoras = await publicadoraRepository.getAll();

    expect(usuarios.length).toBe(1);
    expect(publicadoras.length).toBe(1);

    const admin = await publicadoraRepository.getById(insertId);
    expect(admin).not.toBeNull();
    expect(admin.cnpj).toBe("cnpj");
    expect(admin.nome).toBe("nome");
    expect(admin.email).toBe("a@a.com");
    expect(admin.senha).toBe("senha");
});

test('não adiciona publicadora com email repetido', async () => {
    let insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);
    insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    expect(insertId).toBe(-1);

    let usuarios = await usuarioRepository.getAll();
    let publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(1);
    expect(publicadoras.length).toBe(1);
});

test('apaga usuário se não adicionar a publicadora', async () => {
    let insertId = await publicadoraRepository.add(new Publicadora(0, "cnpjhgggggggggggggggggggggggggggggggggg", "nome", "a@a.com", "senha"));
    expect(insertId).toBe(-1);
    let usuarios = await usuarioRepository.getAll();
    let publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(publicadoras.length).toBe(0);
});

test('lista todos as publicadoras', async () => {
    let usuarios = await usuarioRepository.getAll();
    let publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(publicadoras.length).toBe(0);
    await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "b@a.com", "senha"));
    await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "c@a.com", "senha"));
    await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "d@a.com", "senha"));
    await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "e@a.com", "senha"));
    await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "f@a.com", "senha"));
    usuarios = await usuarioRepository.getAll();
    publicadoras = await publicadoraRepository.getAll();
    expect(usuarios.length).toBe(6);
    expect(publicadoras.length).toBe(6);
});

test('atualiza informações publicadora', async () => {
    const insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    let publicadora = await publicadoraRepository.getById(insertId);
    expect(publicadora.cnpj).toBe("cnpj");
    expect(publicadora.nome).toBe("nome");
    expect(publicadora.senha).toBe("senha");
    publicadora.cnpj = "novocnpj";
    publicadora.nome = "novonome";
    publicadora.senha = "novasenha";
    await publicadoraRepository.update(insertId, publicadora);
    publicadora = await publicadoraRepository.getById(insertId);
    expect(publicadora.cnpj).toBe("novocnpj");
    expect(publicadora.nome).toBe("novonome");
    expect(publicadora.senha).toBe("novasenha");
});

test('remove uma publicadora', async () => {
    const insertId = await publicadoraRepository.add(new Publicadora(0, "cnpj", "nome", "a@a.com", "senha"));
    let publicadora = await publicadoraRepository.getById(insertId);
    expect(publicadora).not.toBeNull();
    await publicadoraRepository.delete(insertId);
    publicadora = await publicadoraRepository.getById(insertId);
    expect(publicadora).toBeNull();
});

afterAll(async () => {
    await database.disconnect();
});