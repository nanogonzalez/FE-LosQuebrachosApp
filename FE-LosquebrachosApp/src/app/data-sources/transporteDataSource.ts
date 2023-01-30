import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Transporte } from "../interfaces/transporte";
import { TransporteService } from "../services/transporte.service";


export class TransporteDataSource implements DataSource<Transporte> {

    public itemCount: number = 0;

    private transporteSubject = new BehaviorSubject<Transporte[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private _transporteService: TransporteService) {}

    connect(collectionViewer: CollectionViewer): Observable<Transporte[]> {
        
        return this.transporteSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        
        this.transporteSubject.complete();
        this.loadingSubject.complete();
    }


    loadTransportes(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
  
        this.loadingSubject.next(true);

        this._transporteService.getTransportes( search, sortDirection, pageIndex, pageSize).subscribe(

            (transportes) =>{
              
                this.itemCount = transportes.totalRecords;
                this.transporteSubject.next(transportes.data)
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


       