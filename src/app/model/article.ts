import {Tag} from "./tag";
import {Reaction} from "./reaction";
import {Comment} from "./comment";

export class Article {
  public '@id':string;
  public id:number;
  public name?: string;
  public reference?: string;
  public content?: string;
  public draft?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public authorUsername?: string;
  public authorId?: number;
  public reactionsCount?: {[key: string]: number};

  public tags?: Tag[];

  public reactions?: Reaction[];

  public comments?: Comment[];

  constructor(values: object= {}) {
    this.id = 0;
    this.draft = true;
    Object.assign(this, values);
  }

  public countReactionsByType(type: string): number {
    let reactions: number = 0;

    for (let reactionsKey in this.reactionsCount) {
        if (reactionsKey == type) {
          return this.reactionsCount[reactionsKey];
        }
      }

      return reactions;
    }

}
