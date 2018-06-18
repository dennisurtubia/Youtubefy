import { Get, HeaderParam, JsonController } from "routing-controllers";
import { Inject } from "typedi";
import AdminRepository from "../repositories/AdminRepository";
import Administrador from "../models/Administrador";

@JsonController("/admin")
export default class AdminController {


    @Inject()
    private adminRepository!: AdminRepository;


    @Get("/")
    async getAll(@HeaderParam("token") token: string) {

        const admin = new Administrador(2, "cpf aque", "otario", "otario@gmail.com", "1234");
        await this.adminRepository.add(admin);
        // const admin = await this.adminRepository.getById(1);
        // if (admin === null)
        //     return { "erro": "ADMIN_INVALIDO" };
         return { "admin": admin }
    }

    // @Post("/")
    // async insertOne(@HeaderParam("token") token: string, @BodyParam("nome") nome: string) {

    //     if (!isString(token) || token.length <= 0)
    //         return { "erro": "TOKEN_INVALIDO" };

    //     if (!isString(nome) || nome.length <= 0)
    //         return { "erro": "ERRO_BODY" };

    //     const admin = await this.adminRepository.getById(Number.parseInt(token));
    //     if (admin === null)
    //         return { "erro": "ADMIN_INVALIDO" };

    //     const genero = new Genero(0, nome);
    //     genero.administrador = admin;
    //     return await this.generoRepository.add(genero);
    // }
}