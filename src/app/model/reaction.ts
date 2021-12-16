export class Reaction {
  public static LIKE_REACTION = 'LIKE';
  public static LOVE_REACTION = 'LOVE';

  public '@id':string;
  public id:number;
  public type?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public username?: string;
  public userId?: number;

  constructor(values: object= {}) {
    this.id = 0;
    Object.assign(this, values);
  }
}
