// NPM Packages
import { Elysia } from "elysia";
import SteamAuth from "node-steam-openid";
import open from "open";
// Middleware
import authService from "@src/services/auth_service";

const steamController = new Elysia().use(authService);

const steamAuth = new SteamAuth({
  realm: "http://localhost:4000",
  returnUrl: "http://localhost:4000/steam/connnectSteamAccountReciever",
  apiKey: process.env.STEAM_API_KEY as string,
});

steamController.guard(
  {
    verifyToken: true,
  },
  (appGuard) =>
    appGuard.group("/steam", (app) =>
      //
      app
        .get("/connnectSteamAccount", async ({ error, authUser }) => {
          const redirectUrl = await steamAuth.getRedirectUrl();
          console.log(redirectUrl);

          // Opens the URL in the default browser.
          await open(`${redirectUrl}&userEmail=${authUser.email}`);
          //
          return { payload: "", msg: "Ok" };
        })
        //
        .get("/connnectSteamAccountReciever", async ({ request, error }) => {
          try {
            const steamUser = await steamAuth.authenticate(request);

            console.log(steamUser.steamid);

            return { payload: "", msg: "Ok" };
          } catch (error) {
            console.error(error);
          }
        })
    )
);

export default steamController;
