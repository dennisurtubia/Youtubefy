import "reflect-metadata";
import { createExpressServer, useContainer, Action } from "routing-controllers";
import { Container } from "typedi";
import AdminController from "./app/controllers/AdminController";
import GeneroController from "./app/controllers/GeneroController";
import PublicadoraController from "./app/controllers/PublicadoraController";
import { verify } from "jsonwebtoken";
import AdminRepository from "./app/repositories/AdminRepository";
import OuvinteRepository from "./app/repositories/OuvinteRepository";
import PublicadoraRepository from "./app/repositories/PublicadoraRepository";
import MusicaController from "./app/controllers/MusicaController";
import AlbumController from "./app/controllers/AlbumController";

useContainer(Container);

const app = createExpressServer({
    controllers: [GeneroController, AdminController, PublicadoraController,
        MusicaController, AlbumController],
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
    console.log('Server running at http://127.0.0.1:3000');
}
);