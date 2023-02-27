import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private nombreUsuario$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore(){
     return this.role$.asObservable();
  }

  public setRoleForStore(role: string){
    this.role$.next(role);
  }

  public getNombreUsuarioFromStore(){
    return this.nombreUsuario$.asObservable();
  }

  public setNombreUsuarioForStore(nombreUsuario: string){
    this.nombreUsuario$.next(nombreUsuario);
  }
}
