import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenDeCarga } from 'src/app/interfaces/orden-de-carga';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { OrdenDeCargaService } from 'src/app/services/orden-de-carga.service';
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
import { OrdenDeCargaDataSource } from 'src/app/data-sources/ordenDeCargaDataSource';
import { debounceTime, distinctUntilChanged, fromEvent, tap, merge } from 'rxjs';



@Component({
  selector: 'app-listado-orden-de-carga',
  templateUrl: './listado-orden-de-carga.component.html',
  styleUrls: ['./listado-orden-de-carga.component.css']
})
export class ListadoOrdenDeCargaComponent implements OnInit, AfterViewInit{



  displayedColumns: string[] = ['destinoCarga', 'destinoDescarga', 'diaHoraCarga', 'tipoMercaderia', 'acciones'];
  dataSource: OrdenDeCargaDataSource;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  
  constructor(private _snackBar: MatSnackBar, private _ordenDeCargaService: OrdenDeCargaService, private _dialogService: ConfirmBoxService) { }

  
  ngOnInit(): void {
   /* this.obtenerOrdenDeCarga();*/
   this.dataSource = new OrdenDeCargaDataSource(this._ordenDeCargaService);
   this.dataSource.loadOrdenDeCarga('', 'asc', 1, 10);
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
                    this.loadOrdenDeCargaPage();
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 1);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadOrdenDeCargaPage())
    )
    .subscribe();
  }

  loadOrdenDeCargaPage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadOrdenDeCarga(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }
  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  obtenerOrdenDeCarga(){
    this._ordenDeCargaService.getOrdenesDeCargas().subscribe({
      next: data =>{
         this.dataSource.data = data.data;
      }
    })
  }*/

  eliminarOrdenDeCarga(id: number){
  
     this._dialogService.openConfirmDialog('Pedido De Carga')
     .afterClosed().subscribe(res=>{
      if(res){
        this._ordenDeCargaService.deleteOrdenDeCarga(id).subscribe(()=>{
          this.mensajeExito();
          this.loadOrdenDeCargaPage();
          /*this.obtenerOrdenDeCarga();*/
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


