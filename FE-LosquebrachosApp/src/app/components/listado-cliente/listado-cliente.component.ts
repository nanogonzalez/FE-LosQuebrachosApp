import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, tap, merge } from 'rxjs';
import { ClienteDataSource } from 'src/app/data-sources/clienteDataSource';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';

@Component({
  selector: 'app-listado-cliente',
  templateUrl: './listado-cliente.component.html',
  styleUrls: ['./listado-cliente.component.css']
})
export class ListadoClienteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['razonSocial', 'cuit', 'destinoCarga', 'acciones'];
  dataSource: ClienteDataSource;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private _snackBar: MatSnackBar, private _clienteService: ClienteService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    /*this.obtenerCliente();*/
    this.dataSource = new ClienteDataSource(this._clienteService);
    this.dataSource.loadClientes('', 'asc', 1, 10);
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
                    this.paginator.pageIndex = 1;
                    this.loadClientePage();
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 1);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadClientePage())
    )
    .subscribe();
  }

  loadClientePage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadClientes(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }

 /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerCliente(){
    this._clienteService.getClientes().subscribe({
      next: data=>{
        this.dataSource.data = data.data;
      }
    })
  }*/

  eliminarCliente(id: number){
    
    this._dialogService.openConfirmDialog('Cliente')
     .afterClosed().subscribe(res=>{
      if(res){
        
        this._clienteService.deleteCliente(id).subscribe(()=>{    
          this.mensajeExito();
          this.loadClientePage();
          /*this.obtenerCliente();*/
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
