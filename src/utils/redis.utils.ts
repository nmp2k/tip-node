import getRedis from "~/configs/config.redis";
const client = getRedis();
export const setNx = async (key, val) => {
  try {
    const va = await client.sendCommand([
      "SETNX",
      key.toString(),
      val.toString()
    ]);
    return va;
  } catch (e) {
    console.log("setnx error", e);
  }
};
export const pExpire = async (key, time) => {
  return await client.sendCommand([
    "PEXPIRE",
    key.toString(),
    time.toString(),
    "NX"
  ]);
};
export const delKey = async key => {
  return await client.sendCommand(["DEL", key.toString()]);
};
