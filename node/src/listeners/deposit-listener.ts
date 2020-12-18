import { Message } from "node-nats-streaming";
import { makeTransaction } from "../common/makeTransaction";
import { NODE_NAME } from "../constants";
import { DepositEvent } from "../events/deposit";
import { MineEvent } from "../events/mine";
import { Subjects } from "../events/subjects";
import { Listener } from "../model/Listener";
import { User } from "../model/User";

export class DepositListener extends Listener<DepositEvent> {
  readonly subject = Subjects.Deposit;
  readonly queueGroupName = NODE_NAME;

  async onMessage(data: DepositEvent["data"], msg: Message) {
    try {
      if (data.publisher === NODE_NAME) return msg.ack();
      const recipient = await User.findOne({
        username: data.recipient,
      });
      const sender = await User.findOne({
        username: data.sender,
      });

      if (!sender || !recipient) throw new Error("Users not found");

      await makeTransaction({
        amount: +data.amount,
        sender,
        recipient,
      });
      msg.ack();
    } catch (e) {
      console.log(e.message);
    }
  }
}
