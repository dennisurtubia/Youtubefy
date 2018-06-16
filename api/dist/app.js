"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const GeneroController_1 = __importDefault(require("./app/controllers/GeneroController"));
routing_controllers_1.useContainer(typedi_1.Container);
const app = routing_controllers_1.createExpressServer({
    controllers: [GeneroController_1.default]
});
app.listen(3000, async () => {
    console.log('Server running at http://127.0.0.1:3000');
});
//# sourceMappingURL=app.js.map