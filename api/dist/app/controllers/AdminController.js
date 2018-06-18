"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
const Administrador_1 = __importDefault(require("../models/Administrador"));
let AdminController = class AdminController {
    async getAll(token) {
        const admin = new Administrador_1.default(2, "cpf aque", "otario", "otario@gmail.com", "1234");
        await this.adminRepository.add(admin);
        // const admin = await this.adminRepository.getById(1);
        // if (admin === null)
        //     return { "erro": "ADMIN_INVALIDO" };
        return { "admin": admin };
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdminRepository_1.default)
], AdminController.prototype, "adminRepository", void 0);
__decorate([
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.HeaderParam("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAll", null);
AdminController = __decorate([
    routing_controllers_1.JsonController("/admin")
], AdminController);
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map