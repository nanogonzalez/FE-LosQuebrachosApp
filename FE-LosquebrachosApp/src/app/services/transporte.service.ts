import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedResponse } from '../interfaces/pagedResponse';
import { Transporte } from '../interfaces/transporte';


@Injectable({
    providedIn: 'root'
  })
  export class TransporteService {
  
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Transporte/';
  
    constructor(private hhtp: HttpClient) { }
  
    getTransportes(): Observable<PagedResponse<Transporte>>{
      return this.hhtp.get<PagedResponse<Transporte>>(`${this.myAppUrl}${this.myApiUrl}`);
    }
  
    getTransporte(id: number): Observable<Transporte>{
      return this.hhtp.get<Transporte>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    deleteTransporte(id: number): Observable<void>{
      return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    addTransporte(transporte: Transporte): Observable<Transporte>{
      return this.hhtp.post<Transporte>(`${this.myAppUrl}${this.myApiUrl}`, transporte);
    }
  
    updateTransporte(id: number, transporte: Transporte): Observable<Transporte>{
      return this.hhtp.put<Transporte>(`${this.myAppUrl}${this.myApiUrl}${id}`, transporte);
    }
  }
  