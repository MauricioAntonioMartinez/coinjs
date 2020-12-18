import { Message } from "node-nats-streaming";
import { makeTransaction } from "../common/makeTransaction";
import { MINE_EXCHANGE, NODE_NAME } from "../constants";
import { MineEvent } from "../events/mine";
import { Subjects } from "../events/subjects";
import { Listener } from "../model/Listener";
import { User } from "../model/User";

export class MineListener extends Listener<MineEvent> {
  readonly subject = Subjects.Mine;
  readonly queueGroupName = NODE_NAME;

  async onMessage(data: MineEvent["data"], msg: Message) {
    try {
      if (data.publisher === NODE_NAME) return msg.ack();
      const user = await User.findOne({
        username: data.username,
      });
      if (!user) throw new Error("User not found");

      await makeTransaction({ amount: MINE_EXCHANGE, sender: user });
      msg.ack();
    } catch (e) {
      console.log(e.message);
    }
  }
}
