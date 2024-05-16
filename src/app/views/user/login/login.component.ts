import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../../core/auth/auth-service.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {LoginResponseType} from "../../../types/login-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[A-Z]).{8,20}$')]],
    rememberMe: [false]
  })

  constructor(private authService: AuthServiceService,
              private router: Router,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid && this.loginForm.value.email &&
      this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.rememberMe!)
        .subscribe({
          next: (data: LoginResponseType | DefaultResponseType)=> {
        let error = null;
        if ((data as DefaultResponseType).error !== undefined) {
          error = (data as DefaultResponseType).message;
        }
        const loginResponse = (data as LoginResponseType);
        if (!loginResponse.accessToken || !loginResponse.refreshToken  || !loginResponse.userId) {
          error = 'Something went wrong';
        }
        if (error) {
          //..
        }

        this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
        this.authService.userId = loginResponse.userId;
        this.authService.getUserInfo();
        this._snackBar.open('Вы успешно вошли в систему');
        this.router.navigate(['/']);
      },

        error: (errorResponse: HttpErrorResponse)=> {
          if (errorResponse.error && errorResponse.message) {
            this._snackBar.open(errorResponse.message);
          } else {
            this._snackBar.open('Ошибка входа');
          }
        }
      })
    }
  }
}
