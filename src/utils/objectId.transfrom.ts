import { Types } from "mongoose";
export default function (id: string) {
  return new Types.ObjectId(id);
}
