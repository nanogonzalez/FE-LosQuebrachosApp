import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "visibility_off";

  form: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _snackBar: MatSnackBar, private _userStoreService: UserStoreService) {

    this.form = this.fb.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    });
   }


  ngOnInit(): void {
   
  }

  hideShowPass(){
     this.isText = !this.isText;
     this.isText ? this.eyeIcon = "visibility" : this.eyeIcon = "visibility_off";
     this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.form.valid){
      console.log(this.form.value);
      this._authService.login(this.form.value).subscribe({
        next: (res)=>{
          console.log(res.message);
          this.form.reset();
          this._authService.storeToken(res.accessToken);
          this._authService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this._authService.decodedToken();
          this._userStoreService.setNombreUsuarioForStore(tokenPayload.name);
          this._userStoreService.setRoleForStore(tokenPayload.role);
          this.mensajeExito();
          this.router.navigate(['mainMenu']);
       },
       error:(err)=> {
        err = this.mensajeError();
      },
      });
    }
  }

  mensajeExito(){
    this._snackBar.open(`Iniciaste la sesión con éxito!`, '' ,{
      duration: 4000,
      horizontalPosition: 'right'
   });
  }
  mensajeError(){
    this._snackBar.open(`Ocurrió un error!`, '' ,{
      duration: 4000,
      horizontalPosition: 'right'
   });
  }
}
  


