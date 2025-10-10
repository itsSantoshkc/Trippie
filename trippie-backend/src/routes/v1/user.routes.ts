import * as express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.ip);
  res.json({
    message: "Successfully Signed In",
  });
});

export default router;
