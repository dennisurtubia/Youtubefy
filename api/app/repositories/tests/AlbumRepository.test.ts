import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import * as faker from "faker/locale/pt_BR";
import { Container } from "typedi";
import PublicadoraController from "../../controllers/PublicadoraController";
import Album from "../../models/Album";
import AlbumRepository from "../AlbumRepository";
import Database from "../Database";
import PublicadoraRepository from "../PublicadoraRepository";

const database = Container.get(Database);
const pubicadoraRepository = Container.get(PublicadoraRepository);
const publicadoraController = Container.get(PublicadoraController)
const albumRepository = Container.get(AlbumRepository);

class InsertRequest {

    @IsString()
    @IsNotEmpty()
    cnpj: string = "";

    @IsString()
    @IsNotEmpty()
    nome: string = "";

    @IsString()
    @IsNotEmpty()
    email: string = "";

    @IsString()
    @IsNotEmpty()
    senha: string = "";
}

class LoginRequest {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string = "";

    @IsString()
    @IsNotEmpty()
    senha: string = "";
}

let admin;
let token;
const email = faker.internet.email();

beforeEach(async () => {
    await database.query('DELETE FROM Album', []);
    const ir = new InsertRequest();

    ir.cnpj = '111';
    ir.email = email;
    ir.nome = faker.name.firstName();
    ir.senha = "123";
    await publicadoraController.insert(ir);
    const lr = new LoginRequest();
    lr.email = email;
    lr.senha = "123";
    token = (await publicadoraController.signin(lr)).token;
})

it('insere alguns albuns', async () => {
    const publicadora = await publicadoraController.get(email);
    expect(publicadora).not.toBeNull();

    let albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);

    for (let i = 0; i < 100; i++) {
        const insertId = await albumRepository.add(new Album(0, faker.name.title(), faker.name.firstName(), faker.name.lastName(), faker.lorem.word(), publicadora.id));
        expect(insertId).not.toBe(-1);
    }


    albums = await albumRepository.getAll();
    expect(albums.length).toBe(100);
});

it('da erro se faltarem informações', async () => {
    const publicadora = await publicadoraController.get(email);
    expect(publicadora).not.toBeNull();

    let albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);

    for (let i = 0; i < 100; i++) {
        const album = new Album(0, '', faker.name.firstName(), faker.name.lastName(), faker.lorem.word(), publicadora.id);
        album.nome = null;
        const insertId = await albumRepository.add(album);
        expect(insertId).toBe(-1);
    }

    albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);
});

it('da erro se a publicadora for inválida', async () => {
    const publicadora = await publicadoraController.get(email);
    expect(publicadora).not.toBeNull();

    let albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);

    for (let i = 0; i < 100; i++) {
        const album = new Album(0, '', faker.name.firstName(), faker.name.lastName(), faker.lorem.word(), 1000);
        const insertId = await albumRepository.add(album);
        expect(insertId).toBe(-1);
    }

    albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);
});

it('recebe algumas informações', async () => {
    const publicadora = await publicadoraController.get(email);
    expect(publicadora).not.toBeNull();

    let albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);

    for (let i = 0; i < 100; i++) {
        const capa = faker.name.firstName();
        const nome = faker.name.firstName();
        const artista = faker.name.firstName();
        const desc = faker.lorem.word();
        let album = new Album(0, capa, nome, artista, desc, publicadora.id);
        const insertId = await albumRepository.add(album);
        expect(insertId).not.toBe(-1);
        album = await albumRepository.getById(insertId);
        expect(album.capa).toBe(capa);
        expect(album.nome).toBe(nome);
        expect(album.nomeArtista).toBe(artista);
        expect(album.descricao).toBe(desc);
        expect(album.idPublicadora).toBe(publicadora.id);
        expect(album.id).toBe(insertId);
    }

    albums = await albumRepository.getAll();
    expect(albums.length).toBe(100);
});


it('atualiza algumas informações', async () => {
    const publicadora = await publicadoraController.get(email);
    expect(publicadora).not.toBeNull();

    let albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);

    for (let i = 0; i < 100; i++) {
        const capa = faker.name.firstName();
        const nome = faker.name.firstName();
        const artista = faker.name.firstName();
        const desc = faker.lorem.word();
        let album = new Album(0, capa, nome, artista, desc, publicadora.id);
        const insertId = await albumRepository.add(album);
        expect(insertId).not.toBe(-1);
        album = await albumRepository.getById(insertId);
        expect(album.capa).toBe(capa);
        expect(album.nome).toBe(nome);
        expect(album.nomeArtista).toBe(artista);
        expect(album.descricao).toBe(desc);
        expect(album.idPublicadora).toBe(publicadora.id);
        expect(album.id).toBe(insertId);

        const _capa = faker.name.firstName();
        const _nome = faker.name.firstName();
        const _artista = faker.name.firstName();
        const _desc = faker.lorem.word();
        album = new Album(0, _capa, _nome, _artista, _desc, publicadora.id);
        await albumRepository.update(insertId, album);
        album = await albumRepository.getById(insertId);
        expect(album.capa).toBe(_capa);
        expect(album.nome).toBe(_nome);
        expect(album.nomeArtista).toBe(_artista);
        expect(album.descricao).toBe(_desc);
        expect(album.idPublicadora).toBe(publicadora.id);
        expect(album.id).toBe(insertId);
    }

    albums = await albumRepository.getAll();
    expect(albums.length).toBe(100);
});

it('apaga alguns albuns', async () => {
    const publicadora = await publicadoraController.get(email);
    expect(publicadora).not.toBeNull();

    let albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);

    for (let i = 0; i < 100; i++) {
        const capa = faker.name.firstName();
        const nome = faker.name.firstName();
        const artista = faker.name.firstName();
        const desc = faker.lorem.word();
        let album = new Album(0, capa, nome, artista, desc, publicadora.id);
        const insertId = await albumRepository.add(album);
        expect(insertId).not.toBe(-1);
        album = await albumRepository.getById(insertId);
        expect(album).not.toBeNull();
        await albumRepository.delete(insertId);
        album = await albumRepository.getById(insertId);
        expect(album).toBeNull();
    }

    albums = await albumRepository.getAll();
    expect(albums.length).toBe(0);
});


afterAll(async () => {
    await database.disconnect();
});