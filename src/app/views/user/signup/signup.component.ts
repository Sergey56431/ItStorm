import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthServiceService} from "../../../core/auth/auth-service.service";
import {LoginResponseType} from "../../../types/login-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[A-Z]).{8,20}$')]],
    name: ['', [Validators.required, Validators.pattern('^([А-Я][а-я]*)((\\s[А-Я][а-я]*)$|$)')]],
    accept: [false, Validators.requiredTrue],
  })

  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private router: Router,
              private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  registration() {
    if (this.registrationForm.valid && this.registrationForm.value.name &&
      this.registrationForm.value.email && this.registrationForm.value.password) {
      this.authService.signup(this.registrationForm.value.name, this.registrationForm.value.password,
        this.registrationForm.value.email).subscribe({
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
            this._snackBar.open('Вы успешно зарегистрировались');
            this.router.navigate(['/']);
          },

          error: (errorResponse: HttpErrorResponse)=> {
            if (errorResponse.error && errorResponse.message) {
              this._snackBar.open(errorResponse.message);
            } else {
              this._snackBar.open('Ошибка регистрации');
            }
          }
      })
    }
  };
}
