import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import alunoRepository from "./app/repositories/alunoRepository";
import { Container } from "typedi";
import Database from "./app/repositories/database";

const app = createExpressServer({
    controllers: []
});

app.listen(3000, async () => {
    console.log('Server running at http://127.0.0.1:3000');
    const rows = await new alunoRepository(Container.get(Database)).getNomeIdade();
    rows.forEach((val, idx) => {
        console.log(idx + '. ' + val.nomeAlun);
    })
}
);