import express, { Request, Response } from "express";
import { body } from "express-validator";
import { NODE_NAME } from "../constants";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";
import { validateRequest } from "../middleware/validateRequest";
import { natsSingleton } from "../nats-singleton";
import { WithDrawalPublisher } from "../publishers/withdrawal-publisher";

export const withDrawalRouter = express.Router();

withDrawalRouter.patch(
  "/withdrawal",
  currentUser,
  requireAuth,
  [body("amount").isFloat({ min: 1.0 })],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = req.user;
    const amount = req.body.amount;

    if (+user.balance - amount < 0) throw new Error("Insufficient founds.");

    const userUpdated = await user
      .set({
        balance: +user.balance - amount,
      })
      .save();
    await new WithDrawalPublisher(natsSingleton.client).publish({
      amount,
      user: user.username,
      publisher: NODE_NAME,
    });

    return res.status(200).json({
      success: true,
      balance: userUpdated.balance,
      message: `WithDrawal Succeeded by: ${NODE_NAME}`,
    });
  }
);
