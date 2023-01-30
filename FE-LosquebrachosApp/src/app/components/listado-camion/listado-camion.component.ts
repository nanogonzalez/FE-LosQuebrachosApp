import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { VehiculoDataSource } from 'src/app/data-sources/vehiculoDataSource';
import { CamionService } from 'src/app/services/camion.service';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';

@Component({
  selector: 'app-listado-camion',
  templateUrl: './listado-camion.component.html',
  styleUrls: ['./listado-camion.component.css']
})
export class ListadoCamionComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['chasis', 'acoplado', 'tipo', 'capacidadTN', 'transporte', 'acciones'];
  dataSource: VehiculoDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private _snackBar: MatSnackBar, private _vehiculoService: CamionService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    this.dataSource = new VehiculoDataSource(this._vehiculoService);
    this.dataSource.loadVehiculos('', 'asc', 1, 10);
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel= "Items por página";
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadVehiculosPage();
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 1);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadVehiculosPage())
    )
    .subscribe();
  }

  loadVehiculosPage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadVehiculos(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }

  eliminarVehiculo(id: number){

    this._dialogService.openConfirmDialog('Vehículo')
     .afterClosed().subscribe(res=>{
      if(res){
        this._vehiculoService.deleteVehiculo(id).subscribe(()=>{
        this.mensajeExito();
        this.loadVehiculosPage();
      })
    }
   })
}


  mensajeExito(){
    this._snackBar.open('El Vehículo fue eliminado con éxito!', '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }
}
