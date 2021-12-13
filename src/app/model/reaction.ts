export class Reaction {
  public id?:number;
  public type?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
