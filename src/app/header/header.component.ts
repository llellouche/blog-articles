import { Component, OnInit } from '@angular/core';
import {RouterService} from "../router/router.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public constructor(public routerService: RouterService) {
  }

  ngOnInit(): void {
  }

}
