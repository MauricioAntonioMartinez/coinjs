import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { User } from "../model/User";
import { CreateAccountPublisher } from "../publishers/create-account-publisher";
import { natsSingleton } from "../nats-singleton";
import { NODE_NAME } from "../constants";

const SECRET_KEY = process.env.SECRET_KEY;

export const accountRouter = express.Router();

accountRouter.post(
  "/signup",
  [
    body("username").trim().isLength({ min: 5, max: 15 }),
    body("password").trim().isLength({ min: 8 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) return res.status(400).json({ message: "User already exists." });

    const newUser = await User.build({
      username: req.body.username,
      password: req.body.password,
    }).save();

    await new CreateAccountPublisher(natsSingleton.client).publish({
      password: req.body.password,
      username: req.body.username,
      publisher: NODE_NAME!,
    });

    const token = await jwt.sign({ username: newUser.username }, SECRET_KEY!, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { maxAge: 60 * 1000, httpOnly: true });

    return res.status(200).json({
      success: true,
    });
  }
);

accountRouter.post(
  "/login",
  [
    body("username").trim().not().isEmpty(),
    body("password").trim().not().isEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return res.status(400).json({ message: "User not found." });

    const isValidPassword = await user.comparePasswords(req.body.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = await jwt.sign({ username: user.username }, SECRET_KEY!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { maxAge: 60 * 1000, httpOnly: true });

    return res.status(200).json({
      success: true,
    });
  }
);
