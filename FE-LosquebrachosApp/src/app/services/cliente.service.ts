import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

@Injectable({
    providedIn: 'root'
  })
  export class ClienteService {

    private myAppUrl: string = environment.endpoint;
    private myApiUrl: string = 'api/Cliente/';
    
    constructor(private hhtp: HttpClient) { }

    getClientes(): Observable<Cliente[]>{
        return this.hhtp.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
      }
      
      getCliente(id: number): Observable<Cliente>{
        return this.hhtp.get<Cliente>(`${this.myAppUrl}${this.myApiUrl}${id}`);
      }
  
      deleteCliente(id: number): Observable<void>{
        return this.hhtp.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
      }
  
      addCliente(cliente: Cliente): Observable<Cliente>{
        return this.hhtp.post<Cliente>(`${this.myAppUrl}${this.myApiUrl}`, cliente);
      }
  
      updateCliente(id: number, cliente: Cliente): Observable<Cliente>{
        return this.hhtp.put<Cliente>(`${this.myAppUrl}${this.myApiUrl}${id}`, cliente);
      }
  }