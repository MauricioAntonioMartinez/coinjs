import { Message } from "node-nats-streaming";
import { makeTransaction } from "../common/makeTransaction";
import { MineEvent } from "../events/mine";
import { Subjects } from "../events/subjects";
import { Listener } from "../model/Listener";
import { User } from "../model/User";

export class MineListener extends Listener<MineEvent> {
  readonly subject = Subjects.Mine;
  readonly queueGroupName = "nodes";

  async onMessage(data: MineEvent["data"], msg: Message) {
    try {
      const user = await User.findOne({
        username: data.username,
      });
      if (!user) throw new Error("User not found");

      await makeTransaction({ amount: data.amount, sender: user });
      msg.ack();
    } catch (e) {
      console.log(e.message);
    }
  }
}
