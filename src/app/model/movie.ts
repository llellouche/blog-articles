import {Video} from "./video";

export class Movie {
  public id?: number;
  public original_language?: string;
  public original_title?: string;
  public overview?: string;
  public popularity?: number;
  public poster_path?: string;
  public release_date?: string;
  public title?: string;
  public vote_average?: number;
  public vote_count?: number;
  public videos?: Video[];

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
