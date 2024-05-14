import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
import {LoginResponseType} from "../../types/login-response.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserInfoType} from "../../types/user-info.type";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public accessTokenKey: string = 'accessToken';
  public refreshTokenKey: string = 'refreshToken';
  public userIdKey: string = 'userId';

  public isLoggedIn$: Subject<boolean> = new Subject<boolean>();
  public isLogged: boolean = false;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem(this.accessTokenKey);

  }

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'login', {
      email,
      password,
      rememberMe
    })
  }

  signup(name: string, password: string, email: string): Observable<LoginResponseType | DefaultResponseType> {
    return this.http.post<LoginResponseType | DefaultResponseType>(environment.api + 'signup', {
      name,
      password,
      email
    })
  }

  getUserInfo(){
    this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'users').subscribe(data => {
      if ((data as DefaultResponseType).error !== undefined){
        throw new Error ((data as DefaultResponseType).message)
      } else {
        this.userInfo.next(data as UserInfoType)
      }
    })
  }
  userInfo: Subject<UserInfoType> = new Subject<UserInfoType>()

  public getIsLoggedIn() {
    return this.isLogged;
  }

  logout(): Observable<DefaultResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'logout', {
        refreshToken: tokens.refreshToken
      });
    }
    throw throwError(() => 'Can not find tokens');
  }

  refresh(): Observable<DefaultResponseType | LoginResponseType> {
    const tokens = this.getTokens();
    if (tokens && tokens.refreshToken) {
      return this.http.post<DefaultResponseType>(environment.api + 'refresh', {
        refreshToken: tokens.refreshToken
      });
    }
    throw throwError(() => 'Can not use tokens');
  }

  public setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.isLogged = true;
    this.isLoggedIn$.next(true);
  }

  public getTokens(): { accessToken: string | null, refreshToken: string | null; } {
    return {
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey)
    }
  }

  public removeTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userIdKey);
    this.isLogged = false;
    this.isLoggedIn$.next(false);
  }

  get userId(): null | string {
    return localStorage.getItem(this.userIdKey);
  }

  set userId(id: string | null) {
    if (id) {
      localStorage.setItem(this.userIdKey, id);
    } else {
      localStorage.removeItem(this.accessTokenKey);
    }
  }
}
