import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenApiModel } from "../models/token-api.model";



@Injectable({
    providedIn: 'root'
  })

  export class AuthService {

    private baseUrl: string = "https://localhost:7076/api/Usuario/";

    private userPayload: any;

    constructor(private http: HttpClient, private router: Router){
      this.userPayload = this.decodedToken();
    }

    signup(userObj: any){
        return this.http.post<any>(`${this.baseUrl}Register`, userObj);
    }

    login(loginObj: any){
        return this.http.post<any>(`${this.baseUrl}Authenticate`, loginObj);
    }

    logout(){
      localStorage.clear();
      this.router.navigate(['login']);
    }

    storeToken(tokenValue: string){
       localStorage.setItem('accessToken', tokenValue);
    }

    storeRefreshToken(tokenValue: string){
      localStorage.setItem('refreshToken', tokenValue);
   }

    getToken(){
      return localStorage.getItem('accessToken');
    }

    getRefreshToken(){
      return localStorage.getItem('refreshToken');
    }

    isLoggedIn(): boolean{
      return !!localStorage.getItem('accessToken');
    }

    decodedToken(){
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      return jwtHelper.decodeToken(token);
    }

    getNombreUsuarioFromToken(){
      if(this.userPayload){
        return this.userPayload.name;
      }
    }

    getRoleFromToken(){
      if(this.userPayload){
        return this.userPayload.role;
      }
    }

    renewToken(tokenApi: TokenApiModel){
      return this.http.post<any>(`${this.baseUrl}Refresh`, tokenApi);
    }
  }