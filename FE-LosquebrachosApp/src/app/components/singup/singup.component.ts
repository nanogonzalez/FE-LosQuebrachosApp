import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "visibility_off";

  form: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      email: ['', Validators.required],
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

 onSingup(){
  if(this.form.valid){
    this._authService.signup(this.form.value).subscribe({
      next: (res)=>{
        console.log(res.message);
        this.form.reset();
        this.mensajeExito();
        this.router.navigate(['login']);
     },
     error:(err)=> {
      err =  this.mensajeError();
     },
    });
  }
 }
 mensajeExito(){
  this._snackBar.open(`Te registraste con éxito!`, '' ,{
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
