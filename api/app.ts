import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import GeneroController from "./app/controllers/GeneroController";

useContainer(Container);

const app = createExpressServer({
    controllers: [GeneroController]
});

app.listen(3000, async () => {
    console.log('Server running at http://127.0.0.1:3000');

}
);