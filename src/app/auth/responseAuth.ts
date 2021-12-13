export class ResponseAuth {
  public success?: string;
  public request_token?: string;
  public expires_at?: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
