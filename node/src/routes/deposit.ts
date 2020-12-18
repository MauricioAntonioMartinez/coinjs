import express, { Request, Response } from "express";
import { body } from "express-validator";
import { makeTransaction } from "../common/makeTransaction";
import { NODE_NAME } from "../constants";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";
import { validateRequest } from "../middleware/validateRequest";
import { User } from "../model/User";
import { natsSingleton } from "../nats-singleton";
import { DepositPublisher } from "../publishers/deposit-publisher";

export const depositRouter = express.Router();

depositRouter.post(
  "/deposit",
  currentUser,
  requireAuth,
  [
    body("recipient").trim().not().isEmpty(),
    body("amount").trim().isFloat({ min: 1 }),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const amount = req.body.amount;
    const recipientName = req.body.recipient;
    const sender = req.user;
    const recipient = await User.findOne({
      username: recipientName,
    });

    if (!recipient) throw new Error("Recipient not found.");

    if (recipient.username === req.user.username)
      throw new Error("You can't deposit to yourself.");

    const newBalance = await makeTransaction({
      amount,
      sender,
      recipient,
    });

    await new DepositPublisher(natsSingleton.client).publish({
      amount,
      sender: sender.username,
      recipient: recipient.username,
      publisher: NODE_NAME,
    });

    return res.status(200).json({
      success: true,
      message: "The transaction has been made.",
      balance: newBalance,
    });
  }
);
