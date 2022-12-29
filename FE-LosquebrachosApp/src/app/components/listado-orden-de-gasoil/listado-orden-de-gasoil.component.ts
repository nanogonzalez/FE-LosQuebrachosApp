import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, tap, merge } from 'rxjs';
import { OrdenDeGasoilDataSource } from 'src/app/data-sources/ordenDeGasoilDataSource';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { OrdenDeGasoilService } from 'src/app/services/orden-de-gasoil.service';

@Component({
  selector: 'app-listado-orden-de-gasoil',
  templateUrl: './listado-orden-de-gasoil.component.html',
  styleUrls: ['./listado-orden-de-gasoil.component.css']
})
export class ListadoOrdenDeGasoilComponent implements OnInit {

  displayedColumns: string[] = ['numeroOrden', 'fecha', 'chofer', 'chasis', 'transporte', 'cuitTransporte', 'litros', 'estacion', 'acciones' ];
  dataSource: OrdenDeGasoilDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private _snackBar: MatSnackBar, private _dialogService: ConfirmBoxService, private _ordenDeGasoilService: OrdenDeGasoilService) { }

  ngOnInit(): void {
    this.dataSource = new OrdenDeGasoilDataSource(this._ordenDeGasoilService);
    this.dataSource.loadOrdenDeGasoil();
  }

  ngAfterViewInit(){

    this.paginator._intl.itemsPerPageLabel= "Items por página";
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadOrdenDeGasoilPage();
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadOrdenDeGasoilPage())
    )
    .subscribe();
  }

  loadOrdenDeGasoilPage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadOrdenDeGasoil(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }

  eliminarOrdenDeGasoil(id: number){
 
    this._dialogService.openConfirmDialog('Orden de Gasoil')
     .afterClosed().subscribe(res=>{
      if(res){
        this._ordenDeGasoilService.deleteOrdenDeGasoil(id).subscribe(()=>{
          this.mensajeExito();
          this.loadOrdenDeGasoilPage();
          })
      }
     })
  }

  mensajeExito(){
    this._snackBar.open('La Orden de Gasoil fue eliminada con éxito!', '' ,{
      duration: 2500,
      horizontalPosition: 'left'
   });
  }
}
