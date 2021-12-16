import {AbstractModel} from "./abstractModel";

export class Article extends AbstractModel {
  public id?:string;
  public name?: string;
  public reference?: string;
  public content?: string;
  public draft?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(values: any) {
    let parsedValues = super(values);
    Object.assign(this, parsedValues);
  }
}
interface Dic {
  [key: string]: any
}
