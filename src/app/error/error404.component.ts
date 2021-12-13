import {Component} from '@angular/core';
import {RouterService} from "../router/router.service";

@Component({
  selector: 'app-error404',
  templateUrl: 'error404.component.html',
  styleUrls: ['error404.component.scss']
})
export class Error404Component {
  public constructor(
    public routerService: RouterService,
  ) {
  }

}
