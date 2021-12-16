export class ResponseAuth {
  public auth_token?: string;
  public email?: string;
  public username?: string;
  public password?: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
