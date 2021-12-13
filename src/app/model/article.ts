export class Article {
  public id?:number;
  public name?: string;
  public reference?: string;
  public content?: string;
  public draft?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
