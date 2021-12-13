export class Gender {
  public id?: number;
  public name?: string;
  public selected?: boolean;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
