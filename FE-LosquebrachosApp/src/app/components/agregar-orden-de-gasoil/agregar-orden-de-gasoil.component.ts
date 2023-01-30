import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { Camion } from 'src/app/interfaces/camion';
import { Chofer } from 'src/app/interfaces/chofer';
import { OrdenDeGasoil } from 'src/app/interfaces/orden-de-gasoil';
import { Transporte } from 'src/app/interfaces/transporte';
import { CamionService } from 'src/app/services/camion.service';
import { ChoferService } from 'src/app/services/chofer.service';
import { OrdenDeGasoilService } from 'src/app/services/orden-de-gasoil.service';
import { TransporteService } from 'src/app/services/transporte.service';

interface Estacion {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-agregar-orden-de-gasoil',
  templateUrl: './agregar-orden-de-gasoil.component.html',
  styleUrls: ['./agregar-orden-de-gasoil.component.css']
})
export class AgregarOrdenDeGasoilComponent implements OnInit {

  estaciones: Estacion[] = [
    {value: 'Shell Las Breñas Carinelli', viewValue: 'Shell Las Breñas Carinelli'},
    {value: 'Shell Charata Victor Apud', viewValue: 'Shell Charata Victor Apud'},
    {value: 'YPF Las Breñas Petrobreñas', viewValue: 'YPF Las Breñas Petrobreñas'},
    {value: 'YPF San Cristobal', viewValue: 'YPF San Cristobal'},
    {value: 'YPF Las Colonias Mercedes Strada', viewValue: 'YPF Las Colonias Mercedes Strada'},
    {value: 'Estación Corbal Pueblo Casas', viewValue: 'Estación Corbal Pueblo Casas'},
  ];

  @ViewChild('inputCamion') inputCamion: ElementRef; 
  @ViewChild('inputChofer') inputChofer: ElementRef; 
  @ViewChild('inputTransporte') inputTransporte: ElementRef;

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  transporte: Transporte;

  transportes: Transporte[] = [];
  camiones: Camion[] = [];
  choferes: Chofer[] = [];

  constructor(private fb: FormBuilder, private _ordenDeGasoilService: OrdenDeGasoilService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _transporteService: TransporteService, private _choferService: ChoferService, private _camionService: CamionService) { 

    this.form = this.fb.group({
      fecha: ['', Validators.required],
      chofer: ['', Validators.required],
      vehiculo: ['', Validators.required],
      transporte: ['', Validators.required],
      cuitTransporte: ['', Validators.required],
      litros: ['', Validators.required],
      estacion: ['', Validators.required],
    })

   this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }
  

  ngOnInit(): void {

    this.transporte = null;

    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerOrdenDeGasoil(this.id);
    }

  }

  ngAfterViewInit(){

    fromEvent(this.inputTransporte.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadTransportes(this.inputTransporte.nativeElement.value);
                })
            )
            .subscribe();
  
    fromEvent(this.inputChofer.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadChoferes(this.inputChofer.nativeElement.value);
                })
            )
            .subscribe();
            
    fromEvent(this.inputCamion.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadCamiones(this.inputCamion.nativeElement.value);
                })
            )
            .subscribe();    

  }

  
  loadTransportes(query = ''){
    this._transporteService.getTransportes(query).subscribe({
      next: response =>{
        this.transportes = response.data;
      }
    })
   }

  loadChoferes(query: string, sortOrder = 'asc', pageNumber = 0, pageSize = 10){
    if(this.transporte){
        this._choferService.getChoferesByTransporte(query, sortOrder, pageNumber, pageSize, this.transporte.id).subscribe(
          result =>{
            this.choferes = result.data;
          }
        );
    }
 }

 loadCamiones(query: string, sortOrder = 'asc', pageNumber = 0, pageSize = 10){
  if(this.transporte){
    this._camionService.getVehiculosByTransporte(query, sortOrder, pageNumber, pageSize, this.transporte.id).subscribe({
      next: result =>{
        this.camiones = result.data;
      }
    });
  }
 }

 selectedTransporte(event: MatAutocompleteSelectedEvent){
    this.transporte = event.option.value;
    this.form.controls['cuitTransporte'].setValue(this.transporte.cuit);
 }

 displayTransporte(transporte: Transporte): string {
    return transporte && transporte.nombre + " " + transporte.apellido ? transporte.nombre + " " + transporte.apellido: '';
  }

  displayChofer(chofer: Chofer): string {
    return chofer && chofer.nombre + " " + chofer.apellido ? chofer.nombre + " " + chofer.apellido: '';
  }

  displayCamion(camion: Camion): string {
    return camion && camion.chasis ? camion.chasis: '';
  }


  obtenerOrdenDeGasoil(id: number){
    this._ordenDeGasoilService.getOrdenDeGasoil(id).subscribe({
     next: data=>{
       this.form.patchValue({
        fecha: data.fecha,
        chofer: data.chofer,
        vehiculo: data.vehiculo,
        transporte: data.transporte,
        cuitTransporte: data.cuitTransporte,
        litros: data.litros,
        estacion: data.estacion,
       })
     }
    })
 }

 agregarEditarOrdenDeGasoil(){
  const ordenDeGasoil: OrdenDeGasoil = {
    fecha: this.form.value.fecha,
    chofer: this.form.value.chofer,
    vehiculo: this.form.value.vehiculo,
    transporte: this.form.value.transporte,
    cuitTransporte: this.form.value.cuitTransporte,
    litros: this.form.value.litros,
    estacion: this.form.value.estacion,
  }

  if(this.id != 0){
    ordenDeGasoil.id = this.id;
     this.editarOrdenDeGasoil(this.id, ordenDeGasoil);
  }else{
    this.agregarOrdenDeGasoil(ordenDeGasoil);
  }
}

editarOrdenDeGasoil(id: number, ordenDeGasoil: OrdenDeGasoil){
  this._ordenDeGasoilService.updateOrdenDeGasoil(id, ordenDeGasoil).subscribe(()=>{
       this.mensajeExito('editada');
       this.router.navigate(['/listOrdenDeGasoil']);
  })
}

agregarOrdenDeGasoil(ordenDeGasoil: OrdenDeGasoil){
  this._ordenDeGasoilService.addOrdenDeGasoil(ordenDeGasoil).subscribe(()=>{
       this.mensajeExito('registrada');
       this.router.navigate(['/listOrdenDeGasoil']);
  })
}

mensajeExito(texto: string){
  this._snackBar.open(`La Orden De Gasoil fue ${texto} con éxito!`, '' ,{
    duration: 2000,
    horizontalPosition: 'left'
 });
}

}
