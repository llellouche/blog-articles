import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../auth/auth.api.service";
import {Router} from '@angular/router';
import {RouterService} from "../router/router.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
    public formGroupLogin: FormGroup;
    private notifier = new Subject();

    constructor(private fb: FormBuilder,
                private authApiService: AuthApiService,
                private router: Router,
                public routerService: RouterService) {
        this.formGroupLogin = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.notifier.next();
        this.notifier.complete();
    }

    public onLoginSubmit(): void {
        if (this.formGroupLogin.invalid) {
            return;
        }

        const trimMail: string = this.formGroupLogin.controls.email.value.toString().trim();
        this.formGroupLogin.get('email')?.setValue(trimMail, {emitEvent: false});

        let email    = this.formGroupLogin.controls.email.value;
        let password = this.formGroupLogin.controls.password.value;
        this.authApiService.getAuthenticationToken(email, password).pipe(takeUntil(this.notifier)).subscribe((res) => {
            if (res?.auth_token) {
                this.router.navigate(this.routerService.generate('app_index'))
            }
        });
    }
}
