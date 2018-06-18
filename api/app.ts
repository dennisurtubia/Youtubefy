import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import AdminController from "./app/controllers/AdminController";
import GeneroController from "./app/controllers/GeneroController";

useContainer(Container);

const app = createExpressServer({
    controllers: [GeneroController, AdminController]
});

app.listen(3000, async () => {
    console.log('Server running at http://127.0.0.1:3000');
}
);