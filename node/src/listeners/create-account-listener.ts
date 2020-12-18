import { Message } from "node-nats-streaming";
import { CreateAccountEvent } from "../events/create-account";
import { Listener } from "../model/Listener";
import { Subjects } from "../events/subjects";
import { User } from "../model/User";

export class CreateAccountListener extends Listener<CreateAccountEvent> {
  readonly subject = Subjects.CreateAccount;
  readonly queueGroupName = "nodes";

  async onMessage(data: CreateAccountEvent["data"], msg: Message) {
    try {
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
