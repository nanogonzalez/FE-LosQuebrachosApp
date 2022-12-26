import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chofer } from '../interfaces/chofer';
import { PagedResponse } from '../interfaces/pagedResponse';



@Injectable({
    providedIn: 'root'
  })
  export class ChoferService {

    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Chofer/';
    
    constructor(private hhtp: HttpClient) { }


    getChoferes(search = '', sortOrder = 'asc' , pageNumber = 1, pageSize = 10): Observable<PagedResponse<Chofer>>{
      return this.hhtp.get<PagedResponse<Chofer>>(`${this.myAppUrl}${this.myApiUrl}`,{
        params: new HttpParams()
        .set('search', search)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      });
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