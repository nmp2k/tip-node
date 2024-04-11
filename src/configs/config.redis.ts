import { RedisClientType, createClient } from "redis";
import config from "./config";
// const redisStatus = ["connect", "end", "reconnecting", "error"];
const {
  redis: { host, port, pass },
} = config;
const public_url = `redis://${host}:${port}`;
const reconnect_one_time = 300;
const reconnect_count = 10;
let instance: RedisClientType;
const initRedis = async () => {
  try {
    instance = createClient({
      url: public_url,
      password: pass,
      socket: socketOptions,
    });
    handleEventConnect(instance);
    await instance.connect();
  } catch (e) {
    console.log(e.message);
  }
};

const getInstance = () => {
  if (!instance) {
    initRedis();
  }
  return instance;
};

export const close = async () => {
  await instance.quit();
};
const socketOptions = {
  reconnectStrategy: function (retries) {
    if (retries > reconnect_count) {
      console.log(
        "Too many attempts to reconnect. Redis connection was terminated"
      );
      return new Error(
        `redis server disconnected: ${new Date().toISOString()}`
      );
    } else {
      return retries * reconnect_one_time;
    }
  },
};
const _local = () => `${public_url} |  ${new Date().toISOString()}`;
const handleEventConnect = (connectEntity) => {
  connectEntity.on("error", (err) => {
    console.log("Redis connect error", err);
  });
  connectEntity.on("end", () => {
    console.log("Redis connect close at :", _local());
  });
  connectEntity.on("connect", () => {
    console.log("Redis connected at :", _local());
  });
  connectEntity.on("reconnecting", () => {
    console.log("redis reconnecting at :", _local());
  });
};
export default getInstance;
