import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { TransporteDataSource } from 'src/app/data-sources/transporteDataSource';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { TransporteService } from 'src/app/services/transporte.service';

@Component({
  selector: 'app-listado-transporte',
  templateUrl: './listado-transporte.component.html',
  styleUrls: ['./listado-transporte.component.css']
})
export class ListadoTransporteComponent implements OnInit, AfterViewInit {

  
  displayedColumns: string[] = ['nombre', 'apellido', 'cuit', 'acciones'];
  dataSource: TransporteDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  
  constructor(private _snackBar: MatSnackBar, private _transporteService: TransporteService, private _dialogService: ConfirmBoxService) { }

  
  ngOnInit(): void {
    /*this.obtenerTransporte();*/
    this.dataSource = new TransporteDataSource(this._transporteService);
    this.dataSource.loadTransportes();
  }

  
  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
    this.paginator._intl.itemsPerPageLabel= "Items por página";
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadTransportePage();
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadTransportePage())
    )
    .subscribe();
  }

  loadTransportePage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadTransportes(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }


  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/



 /* obtenerTransporte(){
    this._transporteService.getTransportes().subscribe({
      next: data =>{
         this.dataSource.data = data.data;
      }
    })
  }*/

  eliminarTransporte(id: number){
  
     this._dialogService.openConfirmDialog('Transporte')
     .afterClosed().subscribe(res=>{
      if(res){
        this._transporteService.deleteTransporte(id).subscribe(()=>{
          this.mensajeExito();
          this.loadTransportePage();
          /*this.obtenerTransporte();*/
          })
      }
     })
  }

  mensajeExito(){
    this._snackBar.open('El Transporte fue eliminado con éxito!', '' ,{
      duration: 2500,
      horizontalPosition: 'left'
   });
  }

}