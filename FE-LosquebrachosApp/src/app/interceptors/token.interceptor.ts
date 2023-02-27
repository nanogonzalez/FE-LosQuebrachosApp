import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this._authService.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err: any)=>{
        if (err instanceof HttpErrorResponse){
          if(err.status === 401){
            return this.handleUnauthorizedError(request, next);
          }
        }
        return throwError(()=> new Error("Otro error ha ocurrido..."))
      })
    );
  }
  mensajeError(){
    this._snackBar.open(`Tu token ha expirado, inicia sesíon nuevamente!`, '' ,{
      duration: 4000,
      horizontalPosition: 'right'
   });
  }
  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this._authService.getToken()!;
    tokenApiModel.refreshToken = this._authService.getRefreshToken()!;
    return this._authService.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel)=>{
        this._authService.storeRefreshToken(data.refreshToken);
        this._authService.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        });
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.mensajeError();
          this.router.navigate(['login']);
        })
      })
    );
  }
}
