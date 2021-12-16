export class Tag {
  public id?: number;
  public title?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public selected?: boolean;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
