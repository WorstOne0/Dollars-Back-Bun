import { Elysia } from "elysia";
// Service
import authService from "@src/services/auth_service";
// Utils
import { challenge } from "@src/utils/o_auth_2_utils";

const animeController = new Elysia().use(authService);

animeController
  .get(
    "/anime/redirect_mal/:_id",
    async ({ headers, query, body, params, error }) => {
      try {
        console.log("params._id", params._id);
        console.log("/anime/redirect_mal - body", body);
        console.log("/anime/redirect_mal - headers", headers);
        console.log("/anime/redirect_mal - query", query);

        return { status: 200, payload: "Conta Conectada com Sucesso", msg: "" };
      } catch (exception) {
        console.log("Controller User :: getAll", exception);
        return error(500, { exception, msg: "" });
      }
    }
  )
  .guard(
    {
      verifyToken: true,
    },
    (appGuard) =>
      appGuard.group("/anime", (app) =>
        //
        app.get("/link_mal_account", async ({ authUser, error }) => {
          try {
            const redirectUrl = `https://myanimelist.net/v1/oauth2/authorize?
              response_type=code
              &client_id=${process.env.MAL_CLIENT_ID}
              &state=${authUser._id}
              &redirect_uri=http://localhost:4000/anime/redirect_mal/${authUser._id}
              &code_challenge=${challenge}
              &code_challenge_method=plain`;
            // {
            //   method: "GET",
            //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
            // }

            return { status: 200, payload: redirectUrl, msg: "" };
          } catch (exception) {
            console.log("Controller User :: getAll", exception);
            return error(500, { exception, msg: "" });
          }
        })
      )
  );

export default animeController;
