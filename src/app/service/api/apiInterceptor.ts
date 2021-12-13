import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
  // Intercept for adding baseApi and API Key
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq;
    newReq = req.clone({
      url: environment.baseApi + req.url,
      setParams: {
        api_key: environment.weCineApiKey,
        language: environment.defaultLanguage,
        ...req.params
      }
    });

    return next.handle(newReq);
  }
}
