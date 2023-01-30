import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DestinoDeDescarga } from '../interfaces/destino-de-descarga';
import { PagedResponse } from '../interfaces/pagedResponse';

@Injectable({
    providedIn: 'root'
  })
  export class DestinoDeDescargaService {

    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/DestinoDeDescarga/';
    
    constructor(private hhtp: HttpClient) { }

    getDestinosDeDescargas(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<DestinoDeDescarga>>{
        return this.hhtp.get<PagedResponse<DestinoDeDescarga>>(`${this.myAppUrl}${this.myApiUrl}`, {
          params: new HttpParams()
          .set('search', search)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
        });
      }
      
      getDestinoDeDescarga(id: number): Observable<DestinoDeDescarga>{
        return this.hhtp.get<DestinoDeDescarga>(`${this.myAppUrl}${this.myApiUrl}${id}`);
      }
  
      deleteDestinoDeDescarga(id: number): Observable<void>{
        return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
      }
  
      addDestinoDeDescarga(destinoDeDescarga: DestinoDeDescarga): Observable<DestinoDeDescarga>{
        return this.hhtp.post<DestinoDeDescarga>(`${this.myAppUrl}${this.myApiUrl}`, destinoDeDescarga);
      }
  
      updateDestinoDeDescarga(id: number, destinoDeDescarga: DestinoDeDescarga): Observable<DestinoDeDescarga>{
        return this.hhtp.put<DestinoDeDescarga>(`${this.myAppUrl}${this.myApiUrl}${id}`, destinoDeDescarga);
      }
  }