// NPM Packages
import { Elysia } from "elysia";
import SteamAuth from "node-steam-openid";
// Service
import authService from "@src/services/auth_service";
// Models
import SteamUser from "../models";

const steamController = new Elysia().use(authService);

steamController
  .get("/steam/link_steam_account_reciever/:_id", async ({ request, params, error }) => {
    try {
      const steamResponse = await new SteamAuth({
        realm: `${process.env.HOST}:${process.env.PORT}`,
        returnUrl: `${process.env.HOST}:${process.env.PORT}/steam/link_steam_account_reciever/${params._id}`,
        apiKey: process.env.STEAM_API_KEY as string,
      }).authenticate(request);

      const steamId = steamResponse.steamid,
        displayName = steamResponse.username,
        username = steamResponse.profile.split("/").at(-2);

      const steamUser = await SteamUser.create({ steamId, displayName, username, userId: params._id });
      // Send response via socket

      return { status: 200, payload: "Conta conectada com sucesso!" };
    } catch (exception) {
      console.log(exception);
      error(500, { error: exception, msg: "" });
    }
  })
  .guard(
    {
      verifyToken: true,
    },
    (appGuard) =>
      appGuard.group("/steam", (app) =>
        //
        app
          .get("/link_steam_account", async ({ authUser, error }) => {
            try {
              const steamAuth = new SteamAuth({
                realm: `${process.env.HOST}:${process.env.PORT}`,
                returnUrl: `${process.env.HOST}:${process.env.PORT}/steam/link_steam_account_reciever/${authUser._id}`,
                apiKey: process.env.STEAM_API_KEY as string,
              });

              const redirectUrl = await steamAuth.getRedirectUrl();

              return { status: 200, payload: redirectUrl, msg: "Ok" };
            } catch (exception) {
              error(500, { error: exception, msg: "" });
            }
          })
          .delete("/unlink_steam_account", async ({ authUser, error }) => {
            try {
              const steamUser = await SteamUser.deleteOne({ userId: authUser._id });

              return { status: 200, payload: steamUser, msg: "Ok" };
            } catch (exception) {
              error(500, { error: exception, msg: "" });
            }
          })
          .get("/get_steam_account", async ({ authUser, error }) => {
            try {
              const steamUser = await SteamUser.findOne({ userId: authUser._id });

              return { status: 200, payload: steamUser, msg: "Ok" };
            } catch (exception) {
              error(500, { error: exception, msg: "" });
            }
          })
      )
  );

export default steamController;
