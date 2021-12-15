import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {RouterService} from "../../router/router.service";
import {AuthService} from "../auth.service";
import {AuthApiService} from "../auth.api.service";
import {map} from "rxjs/operators";

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
  ) {}

  public canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(childRoute);
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {

    }
    return this.isValidToken().pipe(map((isValidToken: boolean) => {
      if (!isValidToken) {
        this.router.navigate(this.routerService.generate('app_login'));
      }

      return isValidToken;
    }));
  }

  private isValidToken(): Observable<boolean> {

    return new Observable(observer => {
        observer.next(this.authService.isAuthenticated());
        observer.complete();
      });
  }
}
