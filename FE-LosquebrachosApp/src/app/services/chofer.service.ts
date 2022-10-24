import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chofer } from '../interfaces/chofer';



@Injectable({
    providedIn: 'root'
  })
  export class ChoferService {

    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Chofer/';
    
    constructor(private hhtp: HttpClient) { }

    getChoferes(): Observable<Chofer[]>{
      return this.hhtp.get<Chofer[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
    
    getChofer(id: number): Observable<Chofer>{
      return this.hhtp.get<Chofer>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }

    deleteChofer(id: number): Observable<void>{
      return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }

    addChofer(chofer: Chofer): Observable<Chofer>{
      return this.hhtp.post<Chofer>(`${this.myAppUrl}${this.myApiUrl}`, chofer);
    }

    updateChofer(id: number, chofer: Chofer): Observable<Chofer>{
      return this.hhtp.put<Chofer>(`${this.myAppUrl}${this.myApiUrl}${id}`, chofer);
    }
  }