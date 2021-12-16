import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from "rxjs/operators";
import {ResponseApi} from "./responseApi";
import {Reaction} from "../../model/reaction";
import {Article} from "../../model/article";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class ReactionApiService extends ApiService {
    public getArticleReactions(articleId: number): Observable<Reaction[]> {
      return this.http
        .get<Reaction[]>(`/articles/${articleId}/reactions`).pipe(
          map(
              (response: any): any => {
                let responseApi = new ResponseApi(response);
                return responseApi.getMembers().map((reaction): Reaction => {
                    return new Reaction(reaction);
                });
              }
          ));
    }

    public sendReaction(reaction: Reaction, article?: Article, user?: User): Observable<void> {
      return this.http
        .post(`/reactions`, {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            type: reaction.type,
            article: article ? article['@id'] : null,
            user: user ? user['@id'] : null,
        }).pipe(
          map((): any => {}));
    }

}
