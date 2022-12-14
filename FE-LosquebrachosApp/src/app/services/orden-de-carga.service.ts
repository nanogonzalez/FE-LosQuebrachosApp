import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdenDeCarga } from '../interfaces/orden-de-carga';
import { PagedResponse } from '../interfaces/pagedResponse';

@Injectable({
    providedIn: 'root'
  })
  export class OrdenDeCargaService {
  
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/OrdenDeCarga/';
  
    constructor(private hhtp: HttpClient) { }
  
    getOrdenesDeCargas(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<OrdenDeCarga>>{
      return this.hhtp.get<PagedResponse<OrdenDeCarga>>(`${this.myAppUrl}${this.myApiUrl}`, {
        params: new HttpParams()
        .set('search', search)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      });
    }
  
    getOrdenDeCarga(id: number): Observable<OrdenDeCarga>{
      return this.hhtp.get<OrdenDeCarga>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    deleteOrdenDeCarga(id: number): Observable<void>{
      return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    addOrdenDeCarga(ordenDeCarga: OrdenDeCarga): Observable<OrdenDeCarga>{
      return this.hhtp.post<OrdenDeCarga>(`${this.myAppUrl}${this.myApiUrl}`, ordenDeCarga);
    }
  
    updateOrdenDeCarga(id: number, ordenDeCarga: OrdenDeCarga): Observable<OrdenDeCarga>{
      return this.hhtp.put<OrdenDeCarga>(`${this.myAppUrl}${this.myApiUrl}${id}`, ordenDeCarga);
    }
  }