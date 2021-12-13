import {Injectable} from '@angular/core';
import APP_ROUTES from './routes.json';

export type Routes = keyof typeof APP_ROUTES;

interface RouteParams {
  [key: string]: string;
}

@Injectable({providedIn: 'root'})
export class RouterService {
  public generate(routeName: Routes, routeParams?: RouteParams): string[] {
    return APP_ROUTES[routeName].map(tmpRouteParam => {
      if (routeParams !== undefined && tmpRouteParam[0] === ':') {
        return routeParams[tmpRouteParam.slice(1)];
      }

      return tmpRouteParam;
    });
  }

  public generateString(routeName: Routes, routeParams?: RouteParams): string {
    const route = this.generate(routeName, routeParams)
      .slice(1)
      .join('/');

    return `/${route}`;
  }
}
