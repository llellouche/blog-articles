import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from "rxjs/operators";
import {Article} from "../../model/article";
import {ResponseApi} from "./responseApi";

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

              let articles = responseApi.getMembers().map((article) => {
                  return new Article(article);
              });

              // console.log(articles);
              return articles;
          }
        ));
  }

}
