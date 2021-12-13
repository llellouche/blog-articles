export class Video {
  public name?:string;
  public key?: string;
  public site?:string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
