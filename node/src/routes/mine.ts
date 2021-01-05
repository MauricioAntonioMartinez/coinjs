import { Request, Response, Router } from "express";
import { MINE_EXCHANGE, NODE_NAME } from "../constants";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";
import { natsSingleton } from "../nats-singleton";
import { MinePublisher } from "../publishers/mine-publisher";

export const mineRouter = Router();

mineRouter.patch(
  "/mine",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const currentUser = req.user;

    const userUpdated = await currentUser
      .set({
        balance: currentUser.balance + MINE_EXCHANGE,
      })
      .save();

    await new MinePublisher(natsSingleton.client).publish({
      amount: req.body.amount,
      username: currentUser.username,
      publisher: NODE_NAME,
    });

    res.status(200).json({
      success: true,
      message: `Mined successfully by: ${NODE_NAME}`,
      balance: userUpdated.balance,
    });
  }
);
