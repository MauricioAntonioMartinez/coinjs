import express, { Request, Response } from "express";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";
import { User } from "../model/User";

export const accountStatusRouter = express.Router();

accountStatusRouter.get(
  "/balance",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const currentUser = await User.findOne({
      username: req.user.username,
    });
    if (!currentUser) throw new Error("User not found.");
    return res.status(200).json({
      balance: currentUser.balance,
    });
  }
);
