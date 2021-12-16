export class User {
  public '@id':string;
  public id?: number;
  public username?: string;
  public email?: string;
  public password?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public authToken?: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
