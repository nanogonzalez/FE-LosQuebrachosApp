import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';

@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['razonSocial', 'cuit','destinoCarga', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>();

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _clienteService: ClienteService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    this.obtenerCliente();
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

  obtenerCliente(){
    this._clienteService.getClientes().subscribe({
      next: data=>{
        this.dataSource.data = data;
      }
    })
  }
  eliminarCliente(id: number){
    
    this._dialogService.openConfirmDialog('Cliente')
     .afterClosed().subscribe(res=>{
      if(res){
        
        this._clienteService.deleteCliente(id).subscribe(()=>{    
          this.mensajeExito();
          this.obtenerCliente();
        })
      }
     })
  }

  mensajeExito(){
    this._snackBar.open('El Cliente fue eliminado con éxito!', '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

}
