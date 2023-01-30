import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DestinoDeCarga } from "../interfaces/destino-de-carga";
import { PagedResponse } from "../interfaces/pagedResponse";

@Injectable({
    providedIn: 'root'
  })
  export class DestinoDeCargaService {
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/DestinoDeCarga/';

    constructor(private hhtp: HttpClient) { }

    getDestinosDeCargas(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<DestinoDeCarga>>{
        return this.hhtp.get<PagedResponse<DestinoDeCarga>>(`${this.myAppUrl}${this.myApiUrl}`, {
          params: new HttpParams()
          .set('search', search)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
        });
      }

      getDestinosDeCargasByCliente(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10, id: number): Observable<PagedResponse<DestinoDeCarga>>{
        return this.hhtp.get<PagedResponse<DestinoDeCarga>>(`${this.myAppUrl}${this.myApiUrl}Cliente/${id}`, {
          params: new HttpParams()
          .set('search', search)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
        });
      }

      getDestinoDeCarga(id: number): Observable<DestinoDeCarga>{
        return this.hhtp.get<DestinoDeCarga>(`${this.myAppUrl}${this.myApiUrl}${id}`);
      }  

      deleteDestinoDeCarga(id: number): Observable<void>{
        return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
      }  

      addDestinoDeCarga(destinoDeCarga: DestinoDeCarga): Observable<DestinoDeCarga>{
        return this.hhtp.post<DestinoDeCarga>(`${this.myAppUrl}${this.myApiUrl}`, destinoDeCarga);
      }
  
      updateDestinoDeCarga(id: number, destinoDeCarga: DestinoDeCarga): Observable<DestinoDeCarga>{
        return this.hhtp.put<DestinoDeCarga>(`${this.myAppUrl}${this.myApiUrl}${id}`, destinoDeCarga);
      }  
  }