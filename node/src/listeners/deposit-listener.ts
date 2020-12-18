import { Message } from "node-nats-streaming";
import { makeTransaction } from "../common/makeTransaction";
import { DepositEvent } from "../events/deposit";
import { MineEvent } from "../events/mine";
import { Subjects } from "../events/subjects";
import { Listener } from "../model/Listener";
import { User } from "../model/User";

export class DepositListener extends Listener<DepositEvent> {
  readonly subject = Subjects.Deposit;
  readonly queueGroupName = "nodes";

  async onMessage(data: DepositEvent["data"], msg: Message) {
    try {
      const recipient = await User.findOne({
        username: data.recipient,
      });
      const sender = await User.findOne({
        username: data.sender,
      });

      if (!sender || !recipient) throw new Error("Users not found");

      await makeTransaction({
        amount: data.amount,
        sender,
        recipient,
      });
      msg.ack();
    } catch (e) {
      console.log(e.message);
    }
  }
}
