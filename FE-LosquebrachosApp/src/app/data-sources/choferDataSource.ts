import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Chofer } from "../interfaces/chofer";
import { ChoferService } from "../services/chofer.service";


export class ChoferDataSource implements DataSource<Chofer>{

    public itemCount: number = 0;

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private choferSubject = new BehaviorSubject<Chofer[]>([]);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _choferService: ChoferService) {}

    connect(collectionViewer: CollectionViewer): Observable<Chofer[]>{

        return this.choferSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void{
        this.choferSubject.complete();
        this.loadingSubject.complete();
    }

    loadChoferes(search = '', sortDirection = 'asc', pageIndex = 1, pageSize = 10){
        this.loadingSubject.next(true);

        this._choferService.getChoferes(search, sortDirection, pageIndex, pageSize).subscribe(
          (choferes) =>{
            this.itemCount = choferes.totalRecords;
            this.choferSubject.next(choferes.data);
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