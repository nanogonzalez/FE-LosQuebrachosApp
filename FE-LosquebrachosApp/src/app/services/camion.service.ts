
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Camion } from '../interfaces/camion';
import { PagedResponse } from '../interfaces/pagedResponse';



@Injectable({
    providedIn: 'root'
  })
  export class CamionService {
  
    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Vehiculo/';
  
    constructor(private hhtp: HttpClient) { }
  
    getVehiculos(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<Camion>>{
      return this.hhtp.get<PagedResponse<Camion>>(`${this.myAppUrl}${this.myApiUrl}`, {
        params: new HttpParams()
        .set('search', search)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      });
    }
  
    getVehiculo(id: number): Observable<Camion>{
      return this.hhtp.get<Camion>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    deleteVehiculo(id: number): Observable<void>{
      return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
    }
  
    addVehiculo(camion: Camion): Observable<Camion>{
      return this.hhtp.post<Camion>(`${this.myAppUrl}${this.myApiUrl}`, camion);
    }
  
    updateVehiculo(id: number, camion: Camion): Observable<Camion>{
      return this.hhtp.put<Camion>(`${this.myAppUrl}${this.myApiUrl}${id}`, camion);
    }
  }
  