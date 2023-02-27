import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router, private _snackBar: MatSnackBar){}
  canActivate(): boolean {
    if(this._authService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login']);
      this.mensajeError();
      return false;
    }
  }
  mensajeError(){
    this._snackBar.open(`Inicie sesión por favor!`, '' ,{
      duration: 4000,
      horizontalPosition: 'right'
   });
  }
}
