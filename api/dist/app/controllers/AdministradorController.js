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
const AdministradorRepository_1 = __importDefault(require("../repositories/AdministradorRepository"));
const typedi_1 = require("typedi");
let AdministradorController = class AdministradorController {
    constructor() {
        console.log('testando');
    }
    async getOne(id) {
        let admin = await this.adminRepository.getById(id);
        if (admin === null)
            return { tipo: "erro", causa: "ID_NOT_FOUND" };
        return admin;
    }
};
__decorate([
    typedi_1.Inject(),
    __metadata("design:type", AdministradorRepository_1.default)
], AdministradorController.prototype, "adminRepository", void 0);
__decorate([
    routing_controllers_1.Get("/admin/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdministradorController.prototype, "getOne", null);
AdministradorController = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], AdministradorController);
exports.default = AdministradorController;
//# sourceMappingURL=AdministradorController.js.map