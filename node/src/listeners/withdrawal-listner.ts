import { Message } from "node-nats-streaming";
import { NODE_NAME } from "../constants";
import { Subjects } from "../events/subjects";
import { WithDrawalEvent } from "../events/withdrawal";
import { Listener } from "../model/Listener";
import { User } from "../model/User";

export class WithDrawalListener extends Listener<WithDrawalEvent> {
  readonly subject = Subjects.WithDrawal;
  queueGroupName = NODE_NAME;

  async onMessage(data: WithDrawalEvent["data"], msg: Message) {
    try {
      if (data.publisher === this.queueGroupName) return msg.ack();

      const user = await User.findOne({
        username: data.user,
      });
      if (!user) throw new Error("User not found");

      if (+user.balance - +data.amount < 0)
        throw new Error("Insufficient founds.");

      await user
        .set({
          balance: +user.balance - +data.amount,
        })
        .save();
      msg.ack();
    } catch (e) {
      console.log(e.message);
    }
  }
}
