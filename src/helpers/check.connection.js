import mongoose from "mongoose";
import os from "os";
import process from "process";
// times for check overload
const SECONDS = 5000;
// count connections
export const countConnections = () => {
  console.log(`number of connections: ${mongoose.connections.length}`);
};
// check overload
export const checkOverload = () => {
  const cores = os.cpus().length;
  const ramUsage = process.memoryUsage().rss;
  const realConnections = mongoose.connections.length;
  const maxConnections = cores * 100;
  setInterval(() => {
    // console.log(`ram usage: ${(ramUsage / 1024 / 1024).toFixed(2)} mb`);
    if (realConnections > maxConnections) {
      console.log(`real connections: ${realConnections}`);
      console.log(`max connections: ${maxConnections}`);
    }
  }, SECONDS);
};
