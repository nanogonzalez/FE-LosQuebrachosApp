import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { DestinoDeCargaDataSource } from 'src/app/data-sources/destinoDeCargaDataSource';
import { ConfirmBoxService } from 'src/app/services/confirm-box.service';
import { DestinoDeCargaService } from 'src/app/services/destinoDeCarga.service';

@Component({
  selector: 'app-listado-destino-de-carga',
  templateUrl: './listado-destino-de-carga.component.html',
  styleUrls: ['./listado-destino-de-carga.component.css']
})
export class ListadoDestinoDeCargaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['latitud', 'longitud', 'cliente', 'nombreEstablecimiento', 'acciones'];
  dataSource: DestinoDeCargaDataSource;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private _snackBar: MatSnackBar, private _destinoDeCargaService: DestinoDeCargaService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
    this.dataSource = new DestinoDeCargaDataSource(this._destinoDeCargaService);
    this.dataSource.loadDestinosDeCargas('', 'asc', 1, 10);
  }

  ngAfterViewInit() {
    
    this.paginator._intl.itemsPerPageLabel= "Items por página";
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                  this.paginator.pageIndex = 0;
                  this.loadDestinoDeCargaPage();
                })
              )
              .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 1);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadDestinoDeCargaPage())
    )
    .subscribe();
  }

  loadDestinoDeCargaPage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadDestinosDeCargas(
      this.input.nativeElement.value,
      this.sort.direction,
      page,
      this.paginator.pageSize
    );
  }

  eliminarDestinoDeCarga(id: number){
    this._dialogService.openConfirmDialog('Destino de Carga')
    .afterClosed().subscribe(res=>{
     if(res){
      this._destinoDeCargaService.deleteDestinoDeCarga(id).subscribe(()=>{
        this.mensajeExito();
        this.loadDestinoDeCargaPage();
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
