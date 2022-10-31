import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenDeCarga } from 'src/app/interfaces/orden-de-carga';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { OrdenDeCargaService } from 'src/app/services/orden-de-carga.service';

@Component({
  selector: 'app-listado-orden-de-carga',
  templateUrl: './listado-orden-de-carga.component.html',
  styleUrls: ['./listado-orden-de-carga.component.css']
})
export class ListadoOrdenDeCargaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['destinoCarga', 'destinoDescarga', 'diaCarga', 'horaCarga', 'tipoMercaderia', 'acciones'];
  dataSource = new MatTableDataSource<OrdenDeCarga>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private _snackBar: MatSnackBar, private _ordenDeCargaService: OrdenDeCargaService, private _dialogService: ConfirmBoxService) { }

  
  ngOnInit(): void {
    this.obtenerOrdenDeCarga();
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



  obtenerOrdenDeCarga(){
    this._ordenDeCargaService.getOrdenesDeCargas().subscribe({
      next: data =>{
         this.dataSource.data = data;
      }
    })
  }

  eliminarOrdenDeCarga(id: number){
  
      

     this._dialogService.openConfirmDialog('Orden De Carga')
     .afterClosed().subscribe(res=>{
      if(res){
        this._ordenDeCargaService.deleteOrdenDeCarga(id).subscribe(()=>{
          this.mensajeExito();
          this.obtenerOrdenDeCarga();
          })
      }
     })
  }

  mensajeExito(){
    this._snackBar.open('La Orden de Carga fue eliminada con éxito!', '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

}  


