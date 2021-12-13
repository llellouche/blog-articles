export class Tag {
  public id?: number;
  public title?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
