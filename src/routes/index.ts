import { Elysia } from "elysia";
// Routes
import authRoute from "@src/modules/auth/controllers";
import userRoute from "@src/modules/user/controllers";
// import steamRoute from "../modules/user/controllers";

const router = new Elysia();
// Routes
router.use(authRoute);
router.use(userRoute);
// router.use(steamRoute);

export default router;
