import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/models/resetPassword.model';
import { ResetPasswordServiceService } from 'src/app/services/reset-password-service.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
 
  form: FormGroup;
  type: string = "password";
  typeConfirm: string = "password";
  isText: boolean = false;
  isTextConfirm: boolean = false;
  eyeIcon: string = "visibility_off";
  eyeIconConfirm: string = "visibility_off";

  emailtoReset!: string;
  emailtoken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private _resetService: ResetPasswordServiceService, private _snackBar: MatSnackBar) {
    
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: ConfirmPasswordValidator('password', 'confirmPassword')
    });

    this.activatedRoute.queryParams.subscribe(val =>{
      this.emailtoReset = val['email'];
      let uriToken = val['code'];
      this.emailtoken = uriToken.replace(/ /g,'+');
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "visibility" : this.eyeIcon = "visibility_off";
    this.isText ? this.type = "text" : this.type = "password";
 }
 hideShowPassConfirm(){
  this.isTextConfirm = !this.isTextConfirm;
  this.isTextConfirm ? this.eyeIconConfirm = "visibility" : this.eyeIconConfirm = "visibility_off";
  this.isTextConfirm ? this.typeConfirm = "text" : this.typeConfirm = "password";
}

reset(){
  if(this.form.valid){
    this.resetPasswordObj.email = this.emailtoReset;
    this.resetPasswordObj.newPassword = this.form.value.password;
    this.resetPasswordObj.confirmPassword = this.form.value.confirmPassword;
    this.resetPasswordObj.emailToken = this.emailtoken;

    this._resetService.resetPassword(this.resetPasswordObj).subscribe({
      next: (res)=>{
        this.mensajeExito(); 
        this.router.navigate(['login']);
      },
      error: (err)=>{
        this.mensajeError();
      }
    });
  }
}
mensajeExito(){
  this._snackBar.open(`Nueva contraseña creada con éxito!`, '' ,{
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
