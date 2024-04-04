import mongoose from "mongoose";
import config from "./config";
const {
  db: { host, port, name, user, pass },
} = config;
const auth = "?authSource=admin";
const DB_URL = `mongodb://${user}:${pass}@${host}:${port}/${name}${auth}`;
const public_url = `mongodb://${host}:${port}/${name}`;
const MAX_POOL_SIZE = 100;
const SERVER_SELECT_TIMEOUT = 10000;

class Database {
  static instance: Database | undefined;
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      const db = mongoose.connection;
      handleEventConnect(db);
      await mongoose.connect(DB_URL, {
        maxPoolSize: MAX_POOL_SIZE,
        serverSelectionTimeoutMS: SERVER_SELECT_TIMEOUT,
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const _local = () => `${public_url} |  ${new Date().toISOString()}`;
const handleEventConnect = (connectEntity) => {
  connectEntity.on("error", (err) => {
    console.log("mongodb get error", err.message);
    console.log("at : ", _local());
  });
  connectEntity.on("disconnected", () => {
    console.log("mongodb disconnected at : ", _local());
  });
  connectEntity.once("open", () => {
    console.log("mongodb stable connected at : ", _local());
  });
  connectEntity.on("connecting", () => {
    console.log("mongodb reconnecting at : ", _local());
  });
};
export default Database.getInstance;
