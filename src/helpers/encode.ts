import { createHash, generateKeyPairSync } from "node:crypto";
const hash = createHash("sha256");
//hash pass with rha256 return hex
export const hashPass = (input: string) => {
  return hash.update(input).digest("hex");
};
// create rsaPairs
export const createRsaPairs = () => {
  return generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
};
