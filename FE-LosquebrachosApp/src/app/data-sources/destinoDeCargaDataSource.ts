import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DestinoDeCarga } from "../interfaces/destino-de-carga";
import { DestinoDeCargaService } from "../services/destinoDeCarga.service";

export class DestinoDeCargaDataSource implements DataSource<DestinoDeCarga>{
    
    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private destinoDeCargaSubject = new BehaviorSubject<DestinoDeCarga[]>([]);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _destinoDeCarga: DestinoDeCargaService) {}

    connect(collectionViewer: CollectionViewer): Observable<DestinoDeCarga[]>{

        return this.destinoDeCargaSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void{
        this.destinoDeCargaSubject.complete();
        this.loadingSubject.complete();
    }

    loadDestinosDeCargas(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
        this.loadingSubject.next(true);

        this._destinoDeCarga.getDestinosDeCargas(search, sortDirection, pageIndex, pageSize).subscribe(
            (destinoDeCarga) =>{
                this.itemCount = destinoDeCarga.totalRecords;
                this.destinoDeCargaSubject.next(destinoDeCarga.data);
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