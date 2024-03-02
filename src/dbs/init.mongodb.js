import mongoose from "mongoose";
import config from "../configs/config.mongodb.js";
const {
  db: { host, port, name },
} = config;
const DB_URL = `mongodb://${host}:${port}/${name}`;
const MAX_POOL_SIZE = 100;

class Database {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      mongoose.connect(DB_URL, {
        maxPoolSize: MAX_POOL_SIZE,
      });
      const db = mongoose.connection;
      db.once("open", () => {
        console.log(`Database connected ${db.host}:${db.port}`);
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

export default Database.getInstance;
