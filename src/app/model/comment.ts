export class Comment {
  public '@id':string;
  public id?:number;
  public content?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public username?: string;
  public userId?: number;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
