import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from "rxjs/operators";
import {ResponseApi} from "./responseApi";
import {Comment} from "../../model/comment";
import {Article} from "../../model/article";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class CommentApiService extends ApiService {
  public getArticleComments(articleId: number): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`/articles/${articleId}/comments`).pipe(
        map(
            (response: any): any => {
              let responseApi = new ResponseApi(response);
              return responseApi.getMembers().map((comment): Comment => {
                return new Comment(comment);
              });
            }
        ));
  }

  public sendComment(comment: Comment, article?: Article, user?: User): Observable<void> {
    return this.http
      .post(`/comments`, {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: comment.content,
        article: article ? article['@id'] : null,
        user: user ? user['@id'] : null,
      }).pipe(
        map((): any => {}));
  }

}
