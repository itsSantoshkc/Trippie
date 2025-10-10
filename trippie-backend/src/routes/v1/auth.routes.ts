import * as express from "express";
import * as z from "zod";
import * as bcrypt from "bcrypt";

import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import UserService, { createUser } from "../../services/userService";
import { comparePassword, hashPassword } from "../../utils/bcrypt";

const router = express.Router();

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.coerce.date(),
  email: z.email(),
  password: z.string(),
  phone: z.string().length(10),
  role: z.string().default("user"),
});

const logInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type signUpData = z.infer<typeof signUpSchema>;
type logInData = z.infer<typeof logInSchema>;

router.post("/login", async (req, res) => {
  const logInValidatedData = logInSchema.parse(req.body);

  const { email, password }: logInData = logInValidatedData;

  const userService = new UserService();

  const userData = await userService.getUserByEmail(email);

  if (!userData || !(await comparePassword(password, userData.password))) {
    res.status(401);
    res.json({ message: "Invalid Credentials" });
  }

  const accessToken = jwt.sign(
    { email: email, dateOfBirth: userData.dateOfBirth },
    "secretToken"
  );

  const refreshToken = jwt.sign(
    crypto.randomBytes(64).toString("hex"),
    "refreshSecretToken"
  );
  res.status(200);
  res.json({
    accessToken,
    refreshToken,
  });
});

router.post("/sign-up", async (req, res) => {
  const validatedData = signUpSchema.parse(req.body);

  try {
    const { dateOfBirth, email }: signUpData = validatedData;

    const userService = new UserService();

    const userData = await userService.getUserByEmail(email);

    if (userData) {
      res.status(401);
      res.json({ message: "User with this email already exist" });
    }

    const accessToken = jwt.sign(
      { email: email, dateOfBirth: dateOfBirth },
      "secretToken"
    );

    const refreshToken = jwt.sign(
      crypto.randomBytes(64).toString("hex"),
      "refreshSecretToken"
    );
    await createUser({
      ...validatedData,
      password: await hashPassword(validatedData.password),
    });

    return res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
});

export default router;
