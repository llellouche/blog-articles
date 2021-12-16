import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {RouterService} from "../router/router.service";

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

    constructor(authService: AuthService,
                router: Router,
                routerService: RouterService) {
        authService.logout();
        router.navigate(routerService.generate('app_login'));
    }

    ngOnInit(): void {
    }

}
