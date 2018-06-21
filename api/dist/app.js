"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const AdminController_1 = __importDefault(require("./app/controllers/AdminController"));
const GeneroController_1 = __importDefault(require("./app/controllers/GeneroController"));
const PublicadoraController_1 = __importDefault(require("./app/controllers/PublicadoraController"));
const jsonwebtoken_1 = require("jsonwebtoken");
const AdminRepository_1 = __importDefault(require("./app/repositories/AdminRepository"));
const OuvinteRepository_1 = __importDefault(require("./app/repositories/OuvinteRepository"));
const PublicadoraRepository_1 = __importDefault(require("./app/repositories/PublicadoraRepository"));
const MusicaController_1 = __importDefault(require("./app/controllers/MusicaController"));
routing_controllers_1.useContainer(typedi_1.Container);
const app = routing_controllers_1.createExpressServer({
    controllers: [GeneroController_1.default, AdminController_1.default, PublicadoraController_1.default,
        MusicaController_1.default],
    authorizationChecker: async (action, roles) => {
        const token = action.request.query.token;
        try {
            const decoded = jsonwebtoken_1.verify(token, "supersecret");
            if (roles.includes('ADMIN')) {
                const admin = await typedi_1.Container.get(AdminRepository_1.default).getByEmail(decoded);
                console.log(admin);
                return admin !== null;
            }
            if (roles.includes('OUVINTE')) {
                const ouvinte = await typedi_1.Container.get(OuvinteRepository_1.default).getByEmail(decoded);
                return ouvinte !== null;
            }
            if (roles.includes('PUBLICADORA')) {
                const publicadora = await typedi_1.Container.get(PublicadoraRepository_1.default).getByEmail(decoded);
                return publicadora !== null;
            }
        }
        catch (err) {
            return false;
        }
        return false;
    },
    currentUserChecker: async (action, value) => {
        const token = action.request.query.token;
        try {
            const decoded = jsonwebtoken_1.verify(token, "supersecret");
            return decoded;
        }
        catch (err) {
            return null;
        }
    }
});
app.listen(3000, async () => {
    console.log('Server running at http://127.0.0.1:3000');
});
//# sourceMappingURL=app.js.map