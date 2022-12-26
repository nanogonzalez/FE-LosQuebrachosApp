import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Camion } from "../interfaces/camion";
import { CamionService } from "../services/camion.service";




export class VehiculoDataSource implements DataSource<Camion> {

    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private vehiculoSubject = new BehaviorSubject<Camion[]>([]);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _vehivuloService: CamionService) {}

    connect(collectionViewer: CollectionViewer): Observable<Camion[]>{
        
        return this.vehiculoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void{
        this.vehiculoSubject.complete();
        this.loadingSubject.complete();
    }

    loadVehiculos(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){

        this.loadingSubject.next(true);

        this._vehivuloService.getVehiculos(search, sortDirection, pageIndex, pageSize).subscribe(
            (vehiculos) =>{
                this.itemCount = vehiculos.totalRecords;
                this.vehiculoSubject.next(vehiculos.data);
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