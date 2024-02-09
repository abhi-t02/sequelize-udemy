import { RequestHandler, Router } from "express";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import User from "../models/user.model";
import { errorType, JwtType, RequestType } from "../types/types";
import authToken from "../middleware/auth.middleware";

const router = Router();

// register user API
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password: plainPassword, status } = req.body;

    const checkUser = User.findOne({
      where: { email },
    });

    if (!(Object.keys(checkUser).length === 0)) {
      throw new Error("Email already exists.");
    }

    const password = await hash(
      plainPassword,
      +(<string>process.env.HASH_ROUND)
    );
    const user = await User.create({
      username,
      email,
      password,
      status,
    });

    res.status(201).json(user);
  } catch (err) {
    (<errorType>err).status = 500;
    next(err);
  }
});

// login API
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("No Email found");
    }

    if (!(await compare(password, user.password))) {
      throw new Error("Password is wrong.");
    }

    const token = sign({ id: user.id }, <string>process.env.JWT_SECRET, {
      expiresIn: 8 * 60 * 60,
    });

    res.json({ message: "User logged in successfully.", token });
  } catch (err) {
    (<errorType>err).status = 500;
    next(err);
  }
});

router.get(
  "/",
  <RequestHandler>authToken,
  async (req: RequestType, res, next) => {
    try {
      const user = await User.findOne({
        attributes: {
          exclude: ["password", "id"],
        },
        where: {
          id: req.id,
        },
      });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
