import { statusCodes, reasonPhrases } from "~/utils/status_code";
class errorRes extends Error {
  public status: number;
  constructor(name: keyof typeof reasonPhrases, mess?: string) {
    super(mess || reasonPhrases[name]);
    this.status = statusCodes[name];
  }
}

export default errorRes;
