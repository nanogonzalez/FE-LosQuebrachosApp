import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';

@Component({
  selector: 'app-listado-camion',
  templateUrl: './listado-camion.component.html',
  styleUrls: ['./listado-camion.component.css']
})
export class ListadoCamionComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['chasis', 'acoplado', 'tipo', 'capacidadTN', 'acciones'];
  dataSource = new MatTableDataSource<Camion>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _vehiculoService: CamionService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    this.obtenerVehiculo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel= "Items por página"
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerVehiculo(){
    this._vehiculoService.getVehiculos().subscribe({
      next: data=>{
        this.dataSource.data = data;
      }
    })
  }

  eliminarVehiculo(id: number){

    this._dialogService.openConfirmDialog('Vehículo')
     .afterClosed().subscribe(res=>{
      if(res){
        this._vehiculoService.deleteVehiculo(id).subscribe(()=>{
        this.mensajeExito();
        this.obtenerVehiculo();
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
