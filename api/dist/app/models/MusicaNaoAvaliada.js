"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Musica_1 = __importDefault(require("./Musica"));
class MusicaNaoAvaliada extends Musica_1.default {
    constructor(id, nome, duracao, explicito, url, idGenero, idAlbum) {
        super(id, nome, duracao, explicito, url, idGenero, idAlbum);
    }
}
exports.default = MusicaNaoAvaliada;
//# sourceMappingURL=MusicaNaoAvaliada.js.map