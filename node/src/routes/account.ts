import express, { Request, Response } from "express";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";
import { User } from "../model/User";

export const accountRouter = express.Router();

accountRouter.get(
  "/balance",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    return res.status(200).json({
      balance: req.user.balance,
    });
  }
);

accountRouter.get("/user/:username", async (req: Request, res: Response) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  res.status(200).json(user);
});
