import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from "rxjs/operators";
import {Tag} from "../../model/tag";
import {ResponseApi} from "./responseApi";

@Injectable({
  providedIn: 'root'
})
export class TagApiService extends ApiService {
  public getArticleTags(articleId: number): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(`/articles/${articleId}/tags`).pipe(
        map(
            (response: any): any => {
              let responseApi = new ResponseApi(response);
              return responseApi.getMembers().map((tag): Tag => {
                  return new Tag(tag);
              });
            }
        ));
  }

  public getAllTags(): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(`/tags`).pipe(
        map(
            (response: any): any => {
              let responseApi = new ResponseApi(response);
              return responseApi.getMembers().map((tag): Tag => {
                  return new Tag(tag);
              });
            }
        ));
  }

}
