import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { OrdenDeCarga } from "../interfaces/orden-de-carga";
import { OrdenDeCargaService } from "../services/orden-de-carga.service";


export class OrdenDeCargaDataSource implements DataSource<OrdenDeCarga>{

    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private ordenDeCargaSubject = new BehaviorSubject<OrdenDeCarga[]>([]);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _ordenDeCargaService: OrdenDeCargaService) {}

    connect(collectionViewer: CollectionViewer): Observable<OrdenDeCarga[]>{

      return this.ordenDeCargaSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void{
        this.ordenDeCargaSubject.complete();
        this.loadingSubject.complete();
    }   

    loadOrdenDeCarga(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
        this.loadingSubject.next(true);

        this._ordenDeCargaService.getOrdenesDeCargas(search, sortDirection, pageIndex, pageSize).subscribe(
            (ordenDeCarga) =>{
                this.itemCount = ordenDeCarga.totalRecords;
                this.ordenDeCargaSubject.next(ordenDeCarga.data);
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