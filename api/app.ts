import { verify } from "jsonwebtoken";
import "reflect-metadata";
import { Action, createExpressServer, ExpressErrorMiddlewareInterface, Middleware, useContainer } from "routing-controllers";
import { Container } from "typedi";
import AdminController from "./app/controllers/AdminController";
import AlbumController from "./app/controllers/AlbumController";
import GeneroController from "./app/controllers/GeneroController";
import MusicaController from "./app/controllers/MusicaController";
import OuvinteController from "./app/controllers/OuvinteController";
import PublicadoraController from "./app/controllers/PublicadoraController";
import AdminRepository from "./app/repositories/AdminRepository";
import OuvinteRepository from "./app/repositories/OuvinteRepository";
import PublicadoraRepository from "./app/repositories/PublicadoraRepository";

useContainer(Container);

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: Function): void {

     
        if (error.name === "AccessDeniedError")
            response.json({ "erro": "ACESSO_NEGADO" });
        else if (error.name === 'BadRequestError')
            response.json({ "erro": "ERRO_BODY" })

        next(error);
    }
}

const app = createExpressServer({
    defaultErrorHandler: false,
    controllers: [GeneroController, AdminController, PublicadoraController,
        MusicaController, AlbumController, OuvinteController],
    routePrefix: "v1",
    authorizationChecker: async (action: Action, roles: string[]) => {

        const token = action.request.query.token;

        try {
            const decoded = verify(token, "supersecret");

            if (roles.includes('ADMIN')) {
                const admin = await Container.get(AdminRepository).getByEmail(decoded as string);
                console.log(admin);

                return admin !== null;
            }

            if (roles.includes('OUVINTE')) {
                const ouvinte = await Container.get(OuvinteRepository).getByEmail(decoded as string);
                return ouvinte !== null;
            }

            if (roles.includes('PUBLICADORA')) {
                const publicadora = await Container.get(PublicadoraRepository).getByEmail(decoded as string);
                return publicadora !== null;
            }

        } catch (err) {
            return false;
        }
        return false;
    },

    currentUserChecker: async (action: Action, value?: any) => {
        const token = action.request.query.token;

        try {
            const decoded = verify(token, "supersecret");
            return decoded;

        } catch (err) {
            return null;
        }
    }
});

app.listen(3000, async () => {
    console.log('Server running at port 3000');
}
);