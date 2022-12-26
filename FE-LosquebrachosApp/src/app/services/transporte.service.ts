import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedResponse } from '../interfaces/pagedResponse';
import { Transporte } from '../interfaces/transporte';


@Injectable({
    providedIn: 'root'
  })
  export class TransporteService {
  
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Transporte/'; 
  
    constructor(private http: HttpClient) { }
  
    getTransportes(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<Transporte>>{
      return this.http.get<PagedResponse<Transporte>>(`${this.myAppUrl}${this.myApiUrl}`, {
        params: new HttpParams()
        .set('search', search)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      });
    }
  
    getTransporte(id: number): Observable<Transporte>{
      return this.http.get<Transporte>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    deleteTransporte(id: number): Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    addTransporte(transporte: Transporte): Observable<Transporte>{
      return this.http.post<Transporte>(`${this.myAppUrl}${this.myApiUrl}`, transporte);
    }
  
    updateTransporte(id: number, transporte: Transporte): Observable<Transporte>{
      return this.http.put<Transporte>(`${this.myAppUrl}${this.myApiUrl}${id}`, transporte);
    }
  }
  