import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordServiceService {

  private baseUrl: string = "https://localhost:7076/api/Usuario/";

  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string){
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`, {});
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPasswordObj);
  }
}
