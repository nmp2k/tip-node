const dev = {
  app: {
    host: process.env.DEV_APP_HOST || "localhost",
    port: process.env.DEV_APP_PORT || 8888,
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDev",
    user: process.env.DEV_DB_USER,
    pass: process.env.DEV_DB_PASS,
  },
  redis: {
    host: process.env.DEV_REDIS_HOST || "127.0.0.1",
    port: process.env.DEV_REDIS_PORT || 6379,
    pass: process.env.DEV_REDIS_PASS,
  },
};
const pro = {
  app: {
    host: process.env.PRO_APP_HOST,
    port: process.env.PRO_APP_PORT || 8888,
  },
  db: {
    host: process.env.PRO_DB_HOST || "127.0.0.1",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "shopDev",
  },
};
const config = { dev, pro };
const node_env = process.env.NODE_ENV || "dev";
export default config[node_env];
