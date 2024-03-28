import { Elysia } from "elysia";
import { challenge } from "@src/utils/o_auth_2_utils";
// Middleware
import authService from "@src/services/auth_service";

const animeController = new Elysia().use(authService);

animeController
  .get("/anime/redirect_mal", async ({ headers, query, body, error }) => {
    try {
      console.log("/anime/redirect_mal - body", body);
      console.log("/anime/redirect_mal - headers", headers);
      console.log("/anime/redirect_mal - query", query);

      return { status: 200, payload: "", msg: "" };
    } catch (exception) {
      console.log("Controller User :: getAll", exception);
      return error(500, { exception, msg: "" });
    }
  })
  .guard(
    {
      verifyToken: true,
    },
    (appGuard) =>
      appGuard.group("/anime", (app) =>
        //
        app
          .get("/authenticate_mal", async ({ error }) => {
            try {
              const response = await fetch(
                `https://myanimelist.net/v1/oauth2/authorize?
              response_type=code
              &client_id=${process.env.MAL_CLIENT_ID}
              &state=YOUR_STATE
              &redirect_uri=http://localhost:4000/anime/redirect_mal
              &code_challenge=${challenge}
              &code_challenge_method=plain `,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
              );

              const body = await response.json();
              console.log(body);

              return { status: 200, payload: "", msg: "" };
            } catch (exception) {
              console.log("Controller User :: getAll", exception);
              return error(500, { exception, msg: "" });
            }
          })
          .post("/link_mal", async ({ body, error }) => {
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
