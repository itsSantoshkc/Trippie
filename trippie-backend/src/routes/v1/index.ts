import * as express from "express";
import authRouter from "./auth.routes";
import listingRouter from "./listing.routes";
import userRouter from "./user.routes";

const router = express.Router();

router.use("/v1/auth", authRouter);

router.use("/v1/listing", listingRouter);
router.use("/v1/ip", userRouter);

export default router;
