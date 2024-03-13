const statusCode = {
  OK: 200,
  CREATED: 201,
};
const reasonPhrase = {
  OK: "OK",
  CREATED: "Created",
};

class successRes {
  public status: number;
  public message: string;
  public metadata: any;
  public options: any;
  constructor({
    type,
    message = reasonPhrase[type],
    metadata = {},
    options = {},
  }: {
    type: keyof typeof reasonPhrase;
    message?: string;
    metadata?: any;
    options?: any;
  }) {
    this.status = statusCode[type];
    this.message = message;
    this.metadata = metadata;
    this.options = options;
  }
  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

export default successRes;
