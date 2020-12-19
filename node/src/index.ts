import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import { urlencoded } from "body-parser";
import { depositRouter } from "./routes/deposit";
import cookieParser from "cookie-parser";
import { withDrawalRouter } from "./routes/withdrawal";
import { natsSingleton } from "./nats-singleton";
import { CreateAccountListener } from "./listeners/create-account-listener";
import { errorHandler } from "./middleware/errorHandler";
import { MineListener } from "./listeners/mine-listener";
import { DepositListener } from "./listeners/deposit-listener";
import { mineRouter } from "./routes/mine";
import { WithDrawalListener } from "./listeners/withdrawal-listner";
import { authRouter } from "./routes/auth";
import { accountRouter } from "./routes/account";

class App {
  private port?: number;
  private clusterId?: string;
  static clientId?: string;
  private mongo_uri?: string;
  private natsUrl?: string;

  async connectDatabase() {
    await mongoose.connect(this.mongo_uri!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`CONNECTED TO THE DATABASE ${App.clientId}`);
  }

  async connectNats() {
    await natsSingleton.connect({
      clientId: App.clientId!,
      clusterId: this.clusterId!,
      urlNats: this.natsUrl!,
    });
  }

  validateEnv() {
    this.port = +process.env.PORT!;
    this.clusterId = process.env.CLUSTER_ID;
    App.clientId = process.env.NODE_NAME;
    this.mongo_uri = process.env.MONGO_URI;
    this.natsUrl = process.env.NATS_URL;
    const SECRET_KEY = process.env.SECRET_KEY;
    const BROTHER_NODES = process.env.BROTHER_NODES;

    if (
      !BROTHER_NODES ||
      !SECRET_KEY ||
      !this.port ||
      !this.clusterId ||
      !App.clientId ||
      !this.mongo_uri ||
      !this.natsUrl
    ) {
      throw new Error("Environment Variables missing");
    }
  }

  start() {
    const app = express();

    app.use((req, res, next) => {
      res.append("Access-Control-Allow-Origin", ["*"]);
      res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.append("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    app.use(
      urlencoded({
        extended: false,
      })
    );
    app.use(cookieParser());
    app.use(express.json());

    app.use(authRouter);
    app.use(accountRouter);
    app.use(depositRouter);
    app.use(withDrawalRouter);
    app.use(mineRouter);

    app.get("*", (req, res) => {
      throw new Error("Route not found.");
    });

    app.use(errorHandler);

    app.listen(this.port, () => {
      console.log(`${App.clientId} STARTED`);
    });
  }

  setUpListeners() {
    new CreateAccountListener(natsSingleton.client).listen();
    new MineListener(natsSingleton.client).listen();
    new DepositListener(natsSingleton.client).listen();
    new WithDrawalListener(natsSingleton.client).listen();
  }
}

try {
  (async () => {
    const app = new App();
    app.validateEnv();
    await app.connectDatabase();
    await app.connectNats();
    app.setUpListeners();
    app.start();
  })();
} catch (e) {
  console.log(e.message);
  process.on("SIGINT", () => natsSingleton.client.close());
  process.on("SIGTERM", () => natsSingleton.client.close());
  process.exit(0);
}
