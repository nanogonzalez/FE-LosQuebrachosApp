import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transporte } from 'src/app/interfaces/transporte';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { TransporteService } from 'src/app/services/transporte.service';

@Component({
  selector: 'app-listado-transporte',
  templateUrl: './listado-transporte.component.html',
  styleUrls: ['./listado-transporte.component.css']
})
export class ListadoTransporteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'cuit', 'acciones'];
  dataSource = new MatTableDataSource<Transporte>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private _snackBar: MatSnackBar, private _transporteService: TransporteService, private _dialogService: ConfirmBoxService) { }

  
  ngOnInit(): void {
    this.obtenerTransporte();
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



  obtenerTransporte(){
    this._transporteService.getTransportes().subscribe({
      next: data =>{
         this.dataSource.data = data;
      }
    })
  }

  eliminarTransporte(id: number){
  
      

     this._dialogService.openConfirmDialog('Transporte')
     .afterClosed().subscribe(res=>{
      if(res){
        this._transporteService.deleteTransporte(id).subscribe(()=>{
          this.mensajeExito();
          this.obtenerTransporte();
          })
      }
     })
  }

  mensajeExito(){
    this._snackBar.open('El Transporte fue eliminado con éxito!', '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

} 

