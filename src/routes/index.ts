import { Elysia } from "elysia";
// Routes
import authRoute from "@src/modules/auth/controllers";
import userRoute from "@src/modules/user/controllers";
import animeRoute from "@src/modules/anime/controllers";
import steamRoute from "@src/modules/steam/controllers";

const router = new Elysia();
// Routes
router.use(authRoute);
router.use(userRoute);
router.use(animeRoute);
router.use(steamRoute);

export default router;
