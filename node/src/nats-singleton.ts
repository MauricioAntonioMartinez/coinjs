import nats, { Stan } from "node-nats-streaming";

export class Nats {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Client is not available yet.");
    }
    return this._client;
  }

  connect({
    clientId,
    clusterId,
    urlNats,
  }: {
    clusterId: string;
    clientId: string;
    urlNats: string;
  }): Promise<void> {
    this._client = nats.connect(clusterId, clientId, {
      url: urlNats,
    });
    return new Promise((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("CONNECTED TO NATS");
        resolve();
      });
      this.client.on("error", () => {
        console.log("COULDN'T CONNECT TO NATS");
        reject();
      });
    });
  }
}

export const natsSingleton = new Nats();
