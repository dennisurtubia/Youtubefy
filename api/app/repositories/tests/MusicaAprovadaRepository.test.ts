import * as faker from "faker/locale/pt_BR";
import Container from "typedi";
import Administrador from "../../models/Administrador";
import Album from "../../models/Album";
import Genero from "../../models/Genero";
import MusicaAprovada from "../../models/MusicaAprovada";
import Publicadora from "../../models/Publicadora";
import AdminRepository from "../AdminRepository";
import AlbumRepository from "../AlbumRepository";
import Database from "../Database";
import GeneroRepository from "../GeneroRepository";
import MusicaAprovadaRepository from "../MusicaAprovadaRepository";
import MusicaRepository from "../MusicaRepository";
import PublicadoraRepository from "../PublicadoraRepository";

const adminRepository = Container.get(AdminRepository);
const musicaAprovadaRepository = Container.get(MusicaAprovadaRepository);
const musicaRepository = Container.get(MusicaRepository);
const database = Container.get(Database);
const generoRepository = Container.get(GeneroRepository)
const albumRepository = Container.get(AlbumRepository);
const publicadoraRepository = Container.get(PublicadoraRepository);

beforeEach(async () => {
    await database.query('DELETE FROM Genero', []);
    await database.query('DELETE FROM Album', []);
    await database.query('DELETE FROM Administrador', []);
    await database.query('DELETE FROM Publicadora', []);
    await database.query('DELETE FROM Usuario', []);
    await database.query('DELETE FROM MusicaAprovada', []);
    await database.query('DELETE FROM Musica', []);
})

it('adiciona algumas músicas aprovadas', async () => {

    let adminId = await adminRepository.add(new Administrador(0, "cpf", "aaa", "a@a.com", "senha"));
    let generoId = await generoRepository.add(new Genero(0, faker.lorem.word(), adminId))
    let publicadoraId = await publicadoraRepository.add(new Publicadora(0, "111", "a", "b@a.com", "123"))
    let albumId = await albumRepository.add(new Album(0, "", "", "", "", publicadoraId));

    expect(adminId).toBeGreaterThan(0);
    expect(generoId).toBeGreaterThan(0)
    expect(publicadoraId).toBeGreaterThan(0)
    expect(albumId).toBeGreaterThan(0)

    let musicas = await musicaRepository.getAll()
    let musicasAprovadas = await musicaAprovadaRepository.getAll()
    expect(musicas.length).toBe(0)
    expect(musicasAprovadas.length).toBe(0)

    for (let i = 0; i < 100; i++) {
        let insertId = await musicaAprovadaRepository.add(new MusicaAprovada(0, "a", 100, true, new Date(), 0, adminId, generoId, albumId))
        expect(insertId).not.toBe(-1)
    }

    musicas = await musicaRepository.getAll()
    musicasAprovadas = await musicaAprovadaRepository.getAll()
    expect(musicas.length).toBe(100)
    expect(musicasAprovadas.length).toBe(100)

})

afterAll(async () => {
    await database.disconnect();
});