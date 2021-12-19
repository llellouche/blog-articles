import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../auth/auth.api.service";
import {Router} from "@angular/router";
import {RouterService} from "../router/router.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formGroupLogin: FormGroup;
  public passwordNotMatches: boolean;
  private notifier = new Subject();

  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private router: Router,
              public routerService: RouterService) {
    this.formGroupLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      passwordCheck: ['', Validators.required]
    });
    this.passwordNotMatches = false;
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  public onLoginSubmit(): void {
    this.formGroupLogin.markAllAsTouched();

    if (this.formGroupLogin.controls.password.value.toString() != ''
        && this.formGroupLogin.controls.passwordCheck.value.toString() != '') {
        this.passwordNotMatches =
            this.formGroupLogin.controls.password.value.toString()
        != this.formGroupLogin.controls.passwordCheck.value.toString()
    } else {
        this.passwordNotMatches = false;
    }

    if (this.formGroupLogin.invalid || this.passwordNotMatches) {
      return;
    }

    const trimMail: string = this.formGroupLogin.controls.email.value.toString().trim();
    this.formGroupLogin.get('email')?.setValue(trimMail, {emitEvent: false});

    let email    = this.formGroupLogin.controls.email.value;
    let username = this.formGroupLogin.controls.username.value;
    let password = this.formGroupLogin.controls.password.value;
    this.authApiService.getRegisterToken(email, username, password).pipe(takeUntil(this.notifier)).subscribe((res) => {
      if (res?.auth_token) {
        this.router.navigate(this.routerService.generate('app_index'))
      }
    });
  }
}
