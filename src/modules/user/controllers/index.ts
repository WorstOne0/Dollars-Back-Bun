import { Elysia } from "elysia";
// Middleware
import authService from "@src/services/auth_service";
// Models
import User from "../models/index.js";

const userController = new Elysia().use(authService);

userController.guard(
  {
    verifyToken: true,
  },
  (appGuard) =>
    appGuard.group("/user", (app) =>
      //
      app
        .get("/", async ({ error }) => {
          try {
            const users = await User.find({}, { password: 0 });

            return { status: 200, payload: users, msg: "" };
          } catch (exception) {
            console.log("Controller User :: getAll", exception);
            return error(500, { exception, msg: "" });
          }
        })
        //
        .get("/:_id", async ({ params, error }) => {
          try {
            const { _id } = params;

            const user = await User.findById(_id).lean();

            return { status: 200, payload: user, msg: "" };
          } catch (exception) {
            console.log("Controller User :: getById", exception);
            return error(500, { exception, msg: "" });
          }
        })
        //
        .post("/", async ({ body, error }) => {
          try {
            const user: any = body;

            const userExists = await User.findOne({ email: user.email });
            if (userExists) return error(409, { exception: "Duplicated", msg: "Email já existe" });

            const created = await User.create(user);

            return { status: 200, payload: created, msg: "Usúario criado com sucesso" };
          } catch (exception) {
            console.log("Controller User :: create", exception);
            return error(500, { exception, msg: "" });
          }
        })
        //
        .put("/", async ({ body, error }) => {
          try {
            const user: any = body;
            const updated = await User.findOneAndUpdate({ _id: user._id }, user);

            return { status: 200, payload: updated, msg: "Usúario atualizado com sucesso" };
          } catch (exception) {
            console.log("Controller User :: update", exception);
            return error(500, { exception, msg: "" });
          }
        })
        //
        .delete("/", async ({ body, error }) => {
          try {
            const user: any = body;
            const deleted = await User.findOneAndUpdate({ _id: user._id }, user);

            return { status: 200, payload: deleted, msg: "Usúario deletado com sucesso" };
          } catch (exception) {
            console.log("Controller User :: delete", exception);
            return error(500, { exception, msg: "" });
          }
        })
    )
);

export default userController;
