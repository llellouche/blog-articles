export class ResponseAuth {
  public auth_token?: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
