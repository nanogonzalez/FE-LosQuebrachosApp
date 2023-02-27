import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResetPasswordServiceService } from 'src/app/services/reset-password-service.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  public resetEmailPassword!: string;
  public isValidEmail!: boolean;

  constructor(private _resetService: ResetPasswordServiceService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  checkValidEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetEmailPassword)){
      console.log(this.resetEmailPassword);
    }

    this._resetService.sendResetPasswordLink(this.resetEmailPassword).subscribe({
      next: (res)=>{
        this.resetEmailPassword = "";
        this.router.navigate(['login']);
      },
      error:(err)=>{
         this.mensajeError(); 
      }
    });
  }

  mensajeError(){
    this._snackBar.open(`Ocurrió un error!`, '' ,{
      duration: 4000,
      horizontalPosition: 'right'
   });
  }
}
