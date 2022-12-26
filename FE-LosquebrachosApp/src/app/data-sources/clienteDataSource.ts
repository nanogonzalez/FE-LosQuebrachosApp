import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Cliente } from "../interfaces/cliente";
import { ClienteService } from "../services/cliente.service";


export class ClienteDataSource implements DataSource<Cliente>{

    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private clienteSubject = new BehaviorSubject<Cliente[]>([]);
    
    public loading$ = this.loadingSubject.asObservable();

    constructor(private _clienteService: ClienteService) {}

    connect(collectionViewer: CollectionViewer): Observable<Cliente[]>{

        return this.clienteSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void{
        this.clienteSubject.complete();
        this.loadingSubject.complete();
    }

    loadClientes(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
        this.loadingSubject.next(true);

        this._clienteService.getClientes(search, sortDirection, pageIndex, pageSize).subscribe(
            (clientes) =>{
                this.itemCount = clientes.totalRecords;
                this.clienteSubject.next(clientes.data);
            },
            _error => {
                of([])  
            },
           () =>{
               this.loadingSubject.next(false)
            }
        );
    }
}