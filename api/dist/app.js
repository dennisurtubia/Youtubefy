"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const AdminController_1 = __importDefault(require("./app/controllers/AdminController"));
const AlbumController_1 = __importDefault(require("./app/controllers/AlbumController"));
const GeneroController_1 = __importDefault(require("./app/controllers/GeneroController"));
const MusicaController_1 = __importDefault(require("./app/controllers/MusicaController"));
const OuvinteController_1 = __importDefault(require("./app/controllers/OuvinteController"));
const PublicadoraController_1 = __importDefault(require("./app/controllers/PublicadoraController"));
const AdminRepository_1 = __importDefault(require("./app/repositories/AdminRepository"));
const OuvinteRepository_1 = __importDefault(require("./app/repositories/OuvinteRepository"));
const PublicadoraRepository_1 = __importDefault(require("./app/repositories/PublicadoraRepository"));
routing_controllers_1.useContainer(typedi_1.Container);
let CustomErrorHandler = class CustomErrorHandler {
    error(error, request, response, next) {
        if (error.name === "AccessDeniedError")
            response.json({ "erro": "ACESSO_NEGADO" });
        else if (error.name === 'BadRequestError')
            response.json({ "erro": "ERRO_BODY" });
        next(error);
    }
};
CustomErrorHandler = __decorate([
    routing_controllers_1.Middleware({ type: "after" })
], CustomErrorHandler);
exports.CustomErrorHandler = CustomErrorHandler;
const app = routing_controllers_1.createExpressServer({
    cors: true,
    defaultErrorHandler: false,
    controllers: [GeneroController_1.default, AdminController_1.default, PublicadoraController_1.default,
        MusicaController_1.default, AlbumController_1.default, OuvinteController_1.default],
    routePrefix: "v1",
    authorizationChecker: async (action, roles) => {
        const token = action.request.query.token;
        try {
            const decoded = jsonwebtoken_1.verify(token, "supersecret");
            if (roles.includes('ADMIN')) {
                const admin = await typedi_1.Container.get(AdminRepository_1.default).getByEmail(decoded);
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
    console.log('Server running at port 3000');
});
//# sourceMappingURL=app.js.map