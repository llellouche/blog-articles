import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
  public constructor(private authService: AuthService) {
  }

  // Intercept for adding baseApi and API Key
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (! this.authService.isAuthenticated()) {
      return next.handle(req);
    }

    let newReq;
    let token: string = <string> this.authService.getToken();

    newReq = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });

    return next.handle(newReq);
  }
}
