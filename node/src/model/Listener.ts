import { Message, Stan } from "node-nats-streaming";
import { Event } from "./Publisher";

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  constructor(private client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(5 * 1000)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const sub = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    sub.on("message", (msg: Message) => {
      console.log(`RECEIVED ${this.subject} / ${this.queueGroupName}`);
      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    if (typeof data === "string") return JSON.parse(data);
    return JSON.parse(data.toString("utf-8"));
  }
}
