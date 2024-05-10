import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, finalize, Observable, switchMap, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthServiceService} from "./auth-service.service";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../types/default-response.type";
import {LoginResponseType} from "../../types/login-response.type";
import {LoaderService} from "../../shared/services/loader.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService,
              private router: Router,
              private loaderService: LoaderService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const tokens = this.authService.getTokens();
    if (tokens && tokens.accessToken) {
      const authReq = req.clone({
        headers: req.headers.set('x-auth', tokens.accessToken),
      });

      return next.handle(authReq)
        .pipe(
          catchError((error) => {
            if (error.status === 401 && authReq.url.includes('/login') && authReq.url.includes('/signup')) {
            return this.handle401(authReq, next);
            }
            return throwError(error);
          }),
          finalize(() => this.loaderService.hide())
        );
    }
    return next.handle(req)
      .pipe(
        finalize(() => this.loaderService.hide()),
      )
  }

  handle401(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refresh()
      .pipe(
        switchMap((result: DefaultResponseType | LoginResponseType) => {
          let error = '';
          if((result as DefaultResponseType).error !== undefined){
            error = (result as DefaultResponseType).message;
          }

          const refreshResult = result as LoginResponseType;
          if(!refreshResult.refreshToken || !refreshResult.accessToken || !refreshResult.userId){
            error = 'Не удалось авторизоваться';
          }

          if(error){
            return throwError(() => new Error(error));
          }

          this.authService.setTokens(refreshResult.accessToken, refreshResult.refreshToken);
          const authReq = req.clone({
            headers: req.headers.set('x-access-token', refreshResult.accessToken),
          })

          return next.handle(authReq);
        }),

        catchError(error => {
          this.authService.removeTokens();
          this.router.navigate(['/login']);
          return throwError(() => new Error(error));
        })
      );
  }
}
