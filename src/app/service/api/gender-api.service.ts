import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Gender} from "../../model/gender";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GenderApiService extends ApiService {
  public getGenders(): Observable<Gender[]> {
    return this.http
      .get<Gender[]>(`/3/genre/movie/list`).pipe(
        map(
          (objectList: any): any => {
            let genders: Gender[] = [];
            // Should browse object because the key change depending language
            // Exemple in FR objectList.genres in EN objectList.genders
            Object.keys(objectList).map((key: any) => {
              objectList[key].map((gender: Gender) => {
                // console.log(gender);
                genders.push(gender);
              });
            });
            return genders;
          }
        ));
  }
}
