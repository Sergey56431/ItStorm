import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "./auth-service.service";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthForvardGuardGuard implements CanActivate {

  constructor(private location: Location,
              private authService: AuthServiceService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getIsLoggedIn()) {
      this.location.back();
      return false;
    }

    return true;
  }

}
