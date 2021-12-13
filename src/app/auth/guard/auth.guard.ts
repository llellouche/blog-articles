import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {RouterService} from "../../router/router.service";
import {map} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {AuthApiService} from "../auth.api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  // TODO : Implements if want only authenticated users

  public constructor(
    private routerService: RouterService,
    private router: Router,
    private authService: AuthService,
    private authApiService: AuthApiService,
  ) {
    //   this.route = location.path();
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(childRoute);
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.validateToken().pipe(map(() => this.validateAccess()));
  }

  private validateAccess(): boolean {
    if (this.authService.isAuthenticated()) {
      // todo get auth by roles

      // logged in so return true
      return true;
    }

    // TODO Improve here with redirection for instance
    window.alert('Cannot authenticate');

    return false;
  }

  private validateToken(): Observable<void> {

    // TODO Get Request Token https://api.themoviedb.org/3/authentication/token/new?api_key=ca804e95ea4878495fa15e7a2bba460a
    // TODO Then redirect to https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
    return new Observable(observer => {
      try {
        this.authApiService.createRequestToken().subscribe(
          data => {
            if (!!data.request_token) {
              this.authService.setToken(data.request_token);
              observer.next();
              observer.complete();
            }
          },
          err => {
            observer.next();
            observer.complete();
          }
        );
      } catch (e) {
        observer.next();
        observer.complete();
      }
    });
  }
}
