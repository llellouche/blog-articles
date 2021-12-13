import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ResponseAuth} from "./responseAuth";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  public constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public getAuthenticationToken(): Observable<ResponseAuth> {
    return new Observable<ResponseAuth>(observer => {
      let url = environment.baseApi + '/3/authentication/token?api_key=' + environment.weCineApiKey
      this.http
        .get(url)
        .pipe(
          map((res: ResponseAuth) => {
            if (res.request_token) {
              return res;
            } else {
              throw {status: 401};
            }
          })
        )
        .subscribe(
          responseAuth => {
            observer.next(responseAuth);
          },
          error => {
            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
    });
  }

  // TODO
  public createRequestToken(): Observable<ResponseAuth> {
    return new Observable<ResponseAuth>(observer => {
      let url = environment.baseApi + '/3/authentication/token?api_key=' + environment.weCineApiKey
      this.http
        .get(url)
        .pipe(
          map((res: ResponseAuth) => {
            if (res.request_token) {
              return res;
            } else {
              throw {status: 401};
            }
          })
        )
        .subscribe(
          responseAuth => {
            this.onAuthLoginSuccess(responseAuth);
            observer.next(responseAuth);
          },
          error => {
            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
    });
  }

  private onAuthLoginSuccess(responseAuth: ResponseAuth): void {
    if (!!responseAuth.request_token) {
      this.authService.setToken(responseAuth.request_token);
    }
  }
}
