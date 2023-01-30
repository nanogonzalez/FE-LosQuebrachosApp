import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdenDeGasoil } from '../interfaces/orden-de-gasoil';
import { PagedResponse } from '../interfaces/pagedResponse';

@Injectable({
    providedIn: 'root'
  })
  export class OrdenDeGasoilService {

    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/OrdenDeGasoil/';
  
    constructor(private hhtp: HttpClient) { }
  
    getOrdenesDeGasoil(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<OrdenDeGasoil>>{
      return this.hhtp.get<PagedResponse<OrdenDeGasoil>>(`${this.myAppUrl}${this.myApiUrl}`, {
        params: new HttpParams()
        .set('search', search)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      });
    }
  
    getOrdenDeGasoil(id: number): Observable<OrdenDeGasoil>{
      return this.hhtp.get<OrdenDeGasoil>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    deleteOrdenDeGasoil(id: number): Observable<void>{
      return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    addOrdenDeGasoil(ordenDeGasoil: OrdenDeGasoil): Observable<OrdenDeGasoil>{
      return this.hhtp.post<OrdenDeGasoil>(`${this.myAppUrl}${this.myApiUrl}`, ordenDeGasoil);
    }
  
    updateOrdenDeGasoil(id: number, ordenDeGasoil: OrdenDeGasoil): Observable<OrdenDeGasoil>{
      return this.hhtp.put<OrdenDeGasoil>(`${this.myAppUrl}${this.myApiUrl}${id}`, ordenDeGasoil);
    }

    getLastOrderNumber(): Observable<string> {
      return this.hhtp.get<string>(`${this.myAppUrl}${this.myApiUrl}lastOrderNumber`);
  }
  }
