export class Comment {
  public id?:number;
  public content?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
