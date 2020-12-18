import nats, { Stan } from "node-nats-streaming";

export interface Event {
  subject: string;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  constructor(private client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject();
        }
        console.log(`Event: ${this.subject} successfully published`);
        resolve(true);
      });
    });
  }
}
