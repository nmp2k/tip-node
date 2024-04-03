import { Types } from "mongoose";
export default function (id: string) {
  const res = new Types.ObjectId(id);
  return res;
}
