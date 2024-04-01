import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
// Database
import { mongoDBConnect } from "./database/mongo";
// Router
import router from "./routes";
import { socketServer } from "./socket";

const app = new Elysia();

app.use(cors(/* your options */));

mongoDBConnect();

app.use(
  swagger({
    documentation: {
      info: {
        title: "Dollars Documentation",
        version: "2.4.3",
      },
    },
  })
);

app.use(router);

const server = app.listen(process.env.PORT!, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});

// socketServer(server.server);
