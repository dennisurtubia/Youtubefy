"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminRepository {
    constructor(database) {
        this.database = database;
    }
    async getById(id) {
        const query = `
        SELECT *
        FROM Administrador
        WHERE id = ?
        `;
        const rows = await this.database.query(query, [id]);
        return rows;
    }
}
exports.default = AdminRepository;
//# sourceMappingURL=AdminRepository.js.map