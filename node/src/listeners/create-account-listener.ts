import { Message } from "node-nats-streaming";
import { CreateAccountEvent } from "../events/create-account";
import { Listener } from "../model/Listener";
import { Subjects } from "../events/subjects";
import { User } from "../model/User";
import { NODE_NAME } from "../constants";

export class CreateAccountListener extends Listener<CreateAccountEvent> {
  readonly subject = Subjects.CreateAccount;
  readonly queueGroupName = NODE_NAME;

  async onMessage(data: CreateAccountEvent["data"], msg: Message) {
    try {
      if (data.publisher === NODE_NAME) return msg.ack();
      const user = await User.findOne({
        username: data.username,
      });
      if (user) {
        console.log("USER ALREADY SAVED");
        msg.ack();
      }

      await User.build({
        username: data.username,
        password: data.password,
      }).save();
      msg.ack();
    } catch (e) {
      console.log(e.message);
    }
  }
}
