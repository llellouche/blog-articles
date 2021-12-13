import {Component, OnInit} from '@angular/core';
import {RouterService} from "./router/router.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public constructor(public routerService: RouterService) {
  }

}
