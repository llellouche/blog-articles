import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ResponseAuth} from "./responseAuth";
import {AuthService} from "./auth.service";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  public constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public getAuthenticationToken(email: string, password: string): Observable<ResponseAuth> {
    return new Observable<ResponseAuth>(observer => {
      let url = '/auth';
      this.http
        .post(url, {
            email: email,
            password: password
        })
        .pipe(
          map((res: ResponseAuth) => {
            if (res.auth_token) {
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

  public getRegisterToken(email: string, username: string, password: string): Observable<ResponseAuth> {
    return new Observable<ResponseAuth>(observer => {
      let url = '/register';
      this.http
        .post(url, {
            email: email,
            username: username,
            password: password
        })
        .pipe(
          map((res: ResponseAuth) => {
            if (res.auth_token) {
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
    if (!!responseAuth.auth_token) {
      this.authService.setToken(responseAuth.auth_token);
      this.authService.setLoggedUser(new User(responseAuth));
    }
  }
}
