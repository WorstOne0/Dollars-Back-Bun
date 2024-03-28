import { Elysia } from "elysia";
// Middleware
import authService from "@src/services/auth_service";
// Models
import User from "@src/modules/user/models";
// Utils
import { decryptPassword } from "@src/utils/encrypt_password";

const authController = new Elysia().use(authService);

authController.guard(
  {
    verifyToken: false,
  },
  (app) =>
    app
      .post("/login", async ({ body, error, jwt }) => {
        try {
          const { email, password } = body as any;

          const user = await User.findOne({ email }, { senha: 0 });

          if (!user) return error(404, { exception: "User not Found" });

          if (!(await decryptPassword(password, user.password))) {
            return error(401, { exception: "Incorrect email or password" });
          }

          const accessToken = await jwt.sign({ user: JSON.stringify(user) });

          return {
            status: 200,
            payload: {
              accessToken,
              user,
            },
          };
        } catch (exception) {
          console.log("Controller User :: getAll", exception);
          return error(401, { exception, msg: "" });
        }
      })
      //
      .get("/reset_password", async ({ params, error }) => {
        return "Resetar Password";
      })
);

export default authController;
