import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";
import { validateRequest } from "../middleware/validateRequest";
import { natsSingleton } from "../nats-singleton";
import { MinePublisher } from "../publishers/mine-publisher";

export const mineRouter = Router();

mineRouter.post(
  "/mine",
  currentUser,
  requireAuth,
  [body("amount").isFloat({ min: 1 })],
  validateRequest,
  async (req: Request, res: Response) => {
    const currentUser = req.user;

    await currentUser
      .set({
        balance: currentUser.balance + req.body.amount,
      })
      .save();

    await new MinePublisher(natsSingleton.client).publish({
      amount: req.body.amount,
      username: currentUser.username,
    });

    res.status(200).json({
      success: true,
      message: "Mined successfully",
    });
  }
);
