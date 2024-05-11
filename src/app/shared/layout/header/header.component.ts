import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../../core/auth/auth-service.service";
import { Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserInfoType} from "../../../types/user-info.type";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'header-comp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private authService: AuthServiceService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private loaderService: LoaderService) {

    this.isLogged = this.authService.getIsLoggedIn();
  }

  userName: string = '';

  ngOnInit(): void {
    this.loaderService.show();
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.authService.userInfo()
      .subscribe((data: UserInfoType) => {
        this.userName = data.name;
        this.loaderService.hide();
      })
  }

  logout() {
    this.authService.logout()
      .subscribe({
        next:() =>{
          ``;
          this.doLogout();
        },
        error:() =>{
          this.doLogout();
        }
      })
  }

  doLogout() {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы успешно вышли из системы');
    this.router.navigate(['/login']);
  }
}
