import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { DestinoDeDescargaDataSource } from 'src/app/data-sources/destinoDeDescargaDataSource';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { DestinoDeDescargaService } from 'src/app/services/destinoDeDescarga.service';

@Component({
  selector: 'app-listado-destino-de-descarga',
  templateUrl: './listado-destino-de-descarga.component.html',
  styleUrls: ['./listado-destino-de-descarga.component.css']
})
export class ListadoDestinoDeDescargaComponent implements OnInit {

  displayedColumns: string[] = ['latitud', 'longitud', 'nombreEstablecimiento', 'acciones'];
  dataSource: DestinoDeDescargaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private _snackBar: MatSnackBar, private _destinoDeDescargaService: DestinoDeDescargaService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    this.dataSource = new DestinoDeDescargaDataSource(this._destinoDeDescargaService);
    this.dataSource.loadDestinosDeDescargas('', 'asc', 1, 10);
  }

  ngAfterViewInit() {
    
    this.paginator._intl.itemsPerPageLabel= "Items por página";
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                  this.paginator.pageIndex = 0;
                  this.loadDestinoDeDescargaPage();
                })
              )
              .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 1);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadDestinoDeDescargaPage())
    )
    .subscribe();
  }

  loadDestinoDeDescargaPage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadDestinosDeDescargas(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }

  eliminarDestinoDeDescarga(id: number){
    this._dialogService.openConfirmDialog('Destino de Descarga')
    .afterClosed().subscribe(res=>{
     if(res){
      this._destinoDeDescargaService.deleteDestinoDeDescarga(id).subscribe(()=>{
        this.mensajeExito();
        this.loadDestinoDeDescargaPage();
      });
    }
   });
}

  mensajeExito(){
    this._snackBar.open('El Destino de Carga fue eliminado con éxito!', '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }


}
