import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chofer } from 'src/app/interfaces/chofer';
import { ChoferService } from 'src/app/services/chofer.service';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';

@Component({
  selector: 'app-listado-chofer',
  templateUrl: './listado-chofer.component.html',
  styleUrls: ['./listado-chofer.component.css']
})
export class ListadoChoferComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'cuit', 'transporte', 'acciones'];
  dataSource = new MatTableDataSource<Chofer>();

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _choferService: ChoferService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    this.obtenerChofer();
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

  obtenerChofer(){
    this._choferService.getChoferes().subscribe({
      next: data=>{
        this.dataSource.data = data.data;
      }
    })
  } 

  eliminarChofer(id: number){
    
    this._dialogService.openConfirmDialog('Chofer')
     .afterClosed().subscribe(res=>{
      if(res){
        
        this._choferService.deleteChofer(id).subscribe(()=>{    
          this.mensajeExito();
          this.obtenerChofer();
        })
      }
     })
  }

  
  mensajeExito(){
    this._snackBar.open('El Chofer fue eliminado con éxito!', '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

}


