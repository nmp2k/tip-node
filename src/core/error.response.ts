import { statusCodes, reasonPhrases } from "~/utils/status_code";
import { reasonPhrases as reasonName } from "~/types/reasonPhrases";

class errorRes extends Error {
  public status: number;
  constructor(name: reasonName, mess?: string) {
    super(mess || reasonPhrases[name]);
    this.status = statusCodes[name];
  }
}

export default errorRes;
