import { Container } from "typedi";
import Administrador from "../../models/Administrador";
import AdminRepository from "../AdminRepository";
import Database from "../Database";
import UsuarioRepository from "../UsuarioRepository";

const database = Container.get(Database);
const adminRepository = Container.get(AdminRepository);
const usuarioRepository = Container.get(UsuarioRepository);

beforeEach(async () => {
    await database.query('DELETE FROM Administrador', []);
    await database.query('DELETE FROM Usuario', []);
})

test('adiciona alguns administradores', async () => {
    let usuarios = await usuarioRepository.getAll();
    let admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(admins.length).toBe(0);

    let insertId = await adminRepository.add(new Administrador(0, "cpf", "aaa", "a@a.com", "senha"));
    expect(insertId).toBeGreaterThan(0);

    admins = await adminRepository.getAll();
    usuarios = await usuarioRepository.getAll();

    expect(admins.length).toBe(1);
    expect(usuarios.length).toBe(1);

    insertId = await adminRepository.add(new Administrador(0, "cpf", "aaa", "b@a.com", "senha"));
    expect(insertId).toBeGreaterThan(0);

    usuarios = await usuarioRepository.getAll();
    admins = await adminRepository.getAll();

    expect(admins.length).toBe(2);
    expect(usuarios.length).toBe(2);

});

test('adiciona um administrador e pega informações pelo email', async () => {
    let usuarios = await usuarioRepository.getAll();
    let admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(admins.length).toBe(0);

    const insertId = await adminRepository.add(new Administrador(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);

    usuarios = await usuarioRepository.getAll();
    admins = await adminRepository.getAll();

    expect(usuarios.length).toBe(1);
    expect(admins.length).toBe(1);

    const admin = await adminRepository.getByEmail("a@a.com");
    expect(admin).not.toBeNull();
    expect(admin.cpf).toBe("cpf");
    expect(admin.nome).toBe("nome");
    expect(admin.email).toBe("a@a.com");
    expect(admin.senha).toBe("senha");
});

test('adiciona um administrador e pega informações pelo id', async () => {
    let usuarios = await usuarioRepository.getAll();
    let admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(admins.length).toBe(0);

    const insertId = await adminRepository.add(new Administrador(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);

    usuarios = await usuarioRepository.getAll();
    admins = await adminRepository.getAll();

    expect(usuarios.length).toBe(1);
    expect(admins.length).toBe(1);

    const admin = await adminRepository.getById(insertId);
    expect(admin).not.toBeNull();
    expect(admin.cpf).toBe("cpf");
    expect(admin.nome).toBe("nome");
    expect(admin.email).toBe("a@a.com");
    expect(admin.senha).toBe("senha");
});

test('não adiciona administrador com email repetido', async () => {
    let insertId = await adminRepository.add(new Administrador(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).not.toBe(-1);
    insertId = await adminRepository.add(new Administrador(0, "cpf", "nome", "a@a.com", "senha"));
    expect(insertId).toBe(-1);

    let usuarios = await usuarioRepository.getAll();
    let admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(1);
    expect(admins.length).toBe(1);
});

test('apaga usuário se não adicionar o administrador', async () => {
    let insertId = await adminRepository.add(new Administrador(0, "cpfhgggggggggggggggggggggggggggggggggg", "nome", "a@a.com", "senha"));
    expect(insertId).toBe(-1);
    let usuarios = await usuarioRepository.getAll();
    let admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(admins.length).toBe(0);
});

test('lista todos os administradores', async () => {
    let usuarios = await usuarioRepository.getAll();
    let admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(0);
    expect(admins.length).toBe(0);
    await adminRepository.add(new Administrador(0, "cpf", "nome", "a@a.com", "senha"));
    await adminRepository.add(new Administrador(0, "cpf", "nome", "b@a.com", "senha"));
    await adminRepository.add(new Administrador(0, "cpf", "nome", "c@a.com", "senha"));
    await adminRepository.add(new Administrador(0, "cpf", "nome", "d@a.com", "senha"));
    await adminRepository.add(new Administrador(0, "cpf", "nome", "e@a.com", "senha"));
    await adminRepository.add(new Administrador(0, "cpf", "nome", "f@a.com", "senha"));
    usuarios = await usuarioRepository.getAll();
    admins = await adminRepository.getAll();
    expect(usuarios.length).toBe(6);
    expect(admins.length).toBe(6);
});

test('atualiza informações administrador', async () => {
    const insertId = await adminRepository.add(new Administrador(0, "cpf", "nome", "a@a.com", "senha"));
    const admin = await adminRepository.getById(insertId);
    expect(admin.cpf).toBe("cpf");
    expect(admin.nome).toBe("nome");
    expect(admin.senha).toBe("senha");
    admin.cpf = "novocpf";
    admin.nome = "novonome"
});


afterAll(async () => {
    await database.disconnect();
});