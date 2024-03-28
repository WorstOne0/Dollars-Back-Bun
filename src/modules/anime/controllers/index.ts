import { Elysia } from "elysia";
// Middleware
import authService from "@src/services/auth_service";

const animeController = new Elysia().use(authService);

animeController.guard(
  {
    verifyToken: true,
  },
  (appGuard) =>
    appGuard.group("/anime", (app) =>
      //
      app.post("/link_mal", async ({ body, error }) => {
        try {
          return { status: 200, payload: "", msg: "" };
        } catch (exception) {
          console.log("Controller User :: getAll", exception);
          return error(500, { exception, msg: "" });
        }
      })
    )
);

export default animeController;
