import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";

const authService = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ACCESS_TOKEN_JWT as string,
      exp: "5h",
    })
  )
  .use(bearer())
  .derive({ as: "scoped" }, async ({ jwt, bearer }) => {
    const user = (await jwt.verify(bearer)) as any;

    return user
      ? {
          authUser: JSON.parse(user.user),
        }
      : user;
  })
  .macro(({ onBeforeHandle }) => ({
    verifyToken(requireAuth: boolean) {
      onBeforeHandle(({ authUser, error }) => {
        if (requireAuth && !authUser) return error(401, "Unauthorized");
      });
    },
  }));

export default authService;
