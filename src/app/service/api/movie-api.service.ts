import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Gender} from "../../model/gender";
import {map} from "rxjs/operators";
import {Movie} from "../../model/movie";
import {Video} from "../../model/video";

@Injectable({
  providedIn: 'root'
})
export class MovieApiService extends ApiService {
  public getNowPlaying(): Observable<Movie[]> {
    return this.http
      .get<Gender[]>(`/3/movie/now_playing`).pipe(
        map(
          (objectList: any): any => {
            return objectList.results.map((movie: Movie) => {
              return movie;
            });
          }
        ));
  }

  public getMovieVideo(movieId?: number): Observable<Gender[]> {
    if (movieId == undefined) {
      throw new Error('movieId parameter needed');
    }

    return this.http
      .get<Movie[]>(`/3/movie/${movieId}/videos`).pipe(
        map(
          (objectList: any): any => {
            return objectList.results.filter((video: Video) => {
              // Filter only youtube videos
              return video.site === 'YouTube';
            });
          }
        ));
  }

  public getDiscoverMovies(genderFilers? : number[]): Observable<Movie[]> {
    let genderParamFiler: string = '';
    if (genderFilers){
      genderFilers.map((genderId: number) => {
        genderParamFiler += genderId + ','
      });
      genderParamFiler = genderParamFiler.slice(0, -1);
    }

    return this.http
      .get<Gender[]>(`/3/discover/movie`, {
        params: {
          sort_by: 'popularity.desc',
          include_adult: 'false',
          include_video: 'yes',
          with_genres: genderParamFiler
        }
      }).pipe(
        map(
          (objectList: any): any => {
            return objectList.results.map((movie: Movie) => {
              return movie;
            });
          }
        ));
  }

  public searchMovies(searchQuery: string): Observable<Movie[]> {
    return this.http
      .get<Gender[]>(`/3/search/movie`, {
        params: {
          query: searchQuery,
          include_adult: false,
        }
      }).pipe(
        map(
          (objectList: any): any => {
            return objectList.results.map((movie: Movie) => {
              return movie;
            });
          }
        ));
  }

}
