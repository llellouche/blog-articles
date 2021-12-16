import {AbstractModel} from "./abstractModel";

export class Tag {
  public '@id':string;
  public id?: number;
  public title?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public selected?: boolean;

  constructor(values: object= {}) {
    this.id = 0;
    Object.assign(this, values);
  }
}
