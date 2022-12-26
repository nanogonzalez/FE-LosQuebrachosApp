import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { OrdenDeGasoil } from "../interfaces/orden-de-gasoil";
import { OrdenDeGasoilService } from "../services/orden-de-gasoil.service";


export class OrdenDeGasoilDataSource implements DataSource<OrdenDeGasoil>{

    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private ordenDeGasoilSubject = new BehaviorSubject<OrdenDeGasoil[]>([]);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _ordenDeGasoilService: OrdenDeGasoilService) {}

    connect(collectionViewer: CollectionViewer): Observable<OrdenDeGasoil[]>{
        
        return this.ordenDeGasoilSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void{
        this.ordenDeGasoilSubject.complete();
        this.loadingSubject.complete();
    }

    loadOrdenDeGasoil(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
        this.loadingSubject.next(true);

        this._ordenDeGasoilService.getOrdenesDeGasoil(search, sortDirection, pageIndex, pageSize).subscribe(
            (ordenDeGasoil) =>{
                this.itemCount = ordenDeGasoil.totalRecords;
                this.ordenDeGasoilSubject.next(ordenDeGasoil.data);
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