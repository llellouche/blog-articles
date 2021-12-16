import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from "rxjs/operators";
import {Article} from "../../model/article";
import {ResponseApi} from "./responseApi";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService extends ApiService {
  public getAllArticles(): Observable<Article[]> {
    return this.http
      .get<Article[]>(`/articles`).pipe(
        map(
          (response: any): any => {
              let responseApi = new ResponseApi(response);

              return responseApi.getMembers().map((article): Article => {
                  return new Article(article);
              });
          }
        ));
  }

    public createArticle(article: Article, user?: User): Observable<void> {
      return this.http
        .post(`/comments`, {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          content: article.content,
          draft: article.draft,
          name: article.name,
          author: user ? user['@id'] : null,
        }).pipe(
          map((): any => {}));
    }

}
