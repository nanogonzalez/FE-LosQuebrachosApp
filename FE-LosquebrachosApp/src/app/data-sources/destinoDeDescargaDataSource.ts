import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DestinoDeDescarga } from "../interfaces/destino-de-descarga";
import { DestinoDeDescargaService } from "../services/destinoDeDescarga.service";


export class DestinoDeDescargaDataSource implements DataSource<DestinoDeDescarga>{

    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private destinoDeDescargaSubject = new BehaviorSubject<DestinoDeDescarga[]>([]);
    
    public loading$ = this.loadingSubject.asObservable();

    constructor(private _destinoDeDescargaService: DestinoDeDescargaService) {}

    connect(collectionViewer: CollectionViewer): Observable<DestinoDeDescarga[]>{

        return this.destinoDeDescargaSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void{
        this.destinoDeDescargaSubject.complete();
        this.loadingSubject.complete();
    }

    loadDestinosDeDescargas(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
        this.loadingSubject.next(true);

        this._destinoDeDescargaService.getDestinosDeDescargas(search, sortDirection, pageIndex, pageSize).subscribe(
            (destinosDeDescarga) =>{
                this.itemCount = destinosDeDescarga.totalRecords;
                this.destinoDeDescargaSubject.next(destinosDeDescarga.data);
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