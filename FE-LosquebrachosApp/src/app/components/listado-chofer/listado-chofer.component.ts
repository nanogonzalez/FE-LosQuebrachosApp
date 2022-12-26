import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { ChoferDataSource } from 'src/app/data-sources/choferDataSource';
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
  dataSource: ChoferDataSource;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private _snackBar: MatSnackBar, private _choferService: ChoferService, private _dialogService: ConfirmBoxService) { }

  ngOnInit(): void {
   /* this.obtenerChofer();*/
   this.dataSource = new ChoferDataSource(this._choferService);
   this.dataSource.loadChoferes('', 'asc', 1, 10);
  }

  ngAfterViewInit() {
   /* this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
    this.paginator._intl.itemsPerPageLabel= "Items por página";
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 1;
                    this.loadChoferPage();
                })
            )
            .subscribe();

    this.sort.sortChange.subscribe(()=> this.paginator.pageIndex = 1);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadChoferPage())
    )
    .subscribe();
  }

  loadChoferPage(){
    const page = this.paginator.pageIndex + 1;
    this.dataSource.loadChoferes(
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

  obtenerChofer(){
    this._choferService.getChoferes().subscribe({
      next: data=>{
        this.dataSource.data = data.data;
      }
    })
  } */

  eliminarChofer(id: number){
    
    this._dialogService.openConfirmDialog('Chofer')
     .afterClosed().subscribe(res=>{
      if(res){
        
        this._choferService.deleteChofer(id).subscribe(()=>{    
          this.mensajeExito();
          this.loadChoferPage();
         /* this.obtenerChofer();*/
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


