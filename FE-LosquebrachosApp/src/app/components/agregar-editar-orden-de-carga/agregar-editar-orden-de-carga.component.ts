import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, tap, map } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { DestinoDeCarga } from 'src/app/interfaces/destino-de-carga';
import { DestinoDeDescarga } from 'src/app/interfaces/destino-de-descarga';
import { OrdenDeCarga } from 'src/app/interfaces/orden-de-carga';
import { ClienteService } from 'src/app/services/cliente.service';
import { DestinoDeCargaService } from 'src/app/services/destinoDeCarga.service';
import { DestinoDeDescargaService } from 'src/app/services/destinoDeDescarga.service';
import { OrdenDeCargaService } from 'src/app/services/orden-de-carga.service';


interface Mercaderia {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-agregar-editar-orden-de-carga',
  templateUrl: './agregar-editar-orden-de-carga.component.html',
  styleUrls: ['./agregar-editar-orden-de-carga.component.css']
})
export class AgregarEditarOrdenDeCargaComponent implements OnInit {

  form: FormGroup;
  id: number;

  mercaderias: Mercaderia[] = [
    {value: 'Soja', viewValue: 'Soja'},
    {value: 'Maíz', viewValue: 'Maíz'},
    {value: 'Trigo', viewValue: 'Trigo'},
    {value: 'Sorgo', viewValue: 'Sorgo'},
    {value: 'Girasol', viewValue: 'Girasol'},
    {value: 'Otros', viewValue: 'Otros'}
  ];

  @ViewChild('inputCliente') inputCliente: ElementRef; 
  @ViewChild('inputDestinoDeCarga') inputDestinoDeCarga: ElementRef; 
  @ViewChild('inputDestinoDeDescarga') inputDestinoDeDescarga: ElementRef;

  cliente: Cliente;
  clientes: Cliente[] = [];
  destinosDeCargas : DestinoDeCarga[] = [];
  destinosDeDescargas : DestinoDeDescarga[] = [];
  operacion: string = 'Agregar';
  destinoDeCarga: DestinoDeCarga;
  destinoDeDescarga: DestinoDeDescarga;

  map: google.maps.Map;
  @ViewChild('mapRef', { static: true }) mapRef: ElementRef

  constructor(private fb: FormBuilder, private _ordenDeCargaService: OrdenDeCargaService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _clienteService: ClienteService, private _destinoDeCargaService: DestinoDeCargaService, private _destinoDeDescargaService: DestinoDeDescargaService) {

    this.form = this.fb.group({
      cliente: ['', Validators.required],
      destinoDeCarga: ['', Validators.required],
      destinoDeDescarga: ['', Validators.required],
      diaHoraCarga: ['', Validators.required],
      distanciaViaje: ['', Validators.required],
      tipoMercaderia: ['', Validators.required],
    })

   this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }


  ngOnInit(): void {

    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: { lat: -27.21667, lng: -61.2 },
      zoom: 8
  });

    this.cliente = null;

    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerOrdenDeCarga(this.id);
    }

  }


  ngAfterViewInit(){

    fromEvent(this.inputCliente.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadClientes(this.inputCliente.nativeElement.value);
                })
            )
            .subscribe();
  
    fromEvent(this.inputDestinoDeCarga.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadDestinosDeCargas(this.inputDestinoDeCarga.nativeElement.value);
                })
            )
            .subscribe();
            
    fromEvent(this.inputDestinoDeDescarga.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadDestinosDeDescargas(this.inputDestinoDeDescarga.nativeElement.value);
                })
            )
            .subscribe();    

  }

  selectedDestinoDeCarga(event: MatAutocompleteSelectedEvent){
    this.destinoDeCarga = event.option.value;
    const map = new google.maps.Map(document.getElementById('mapRef'), {
      zoom: 8,
      center: {lat: this.destinoDeCarga.latitud, lng: this.destinoDeCarga.longitud}
    })
    new google.maps.Marker({
      position: { lat: this.destinoDeCarga.latitud, lng: this.destinoDeCarga.longitud},
      map: map
    });
  }

  loadClientes(query = ''){
    this._clienteService.getClientes(query).subscribe({
      next: response =>{
        this.clientes = response.data;
      }
    })
  }

  loadDestinosDeCargas(query: string, sortOrder = 'asc', pageNumber = 0, pageSize = 10){
     if(this.cliente){
      this._destinoDeCargaService.getDestinosDeCargasByCliente(query, sortOrder, pageNumber, pageSize, this.cliente.id).subscribe(
        result =>{
          this.destinosDeCargas = result.data;
        }
      )
     }
  }
  
  loadDestinosDeDescargas(query = ''){
     this._destinoDeDescargaService.getDestinosDeDescargas(query).subscribe({
      next: response =>{
        this.destinosDeDescargas = response.data;
      }
     })
  }

  selectedCliente(event: MatAutocompleteSelectedEvent){
     this.cliente = event.option.value;
  }

  displayCliente(cliente: Cliente): string {
     return cliente && cliente.razonSocial ? cliente.razonSocial: '';
  }

  displayDestinoDeCarga(destinoDeCarga: DestinoDeCarga): string{
    return destinoDeCarga && destinoDeCarga.nombreEstablecimiento ? destinoDeCarga.nombreEstablecimiento: '';
  }

  displayDestinoDeDescarga(destinoDeDescarga: DestinoDeDescarga): string{
    return destinoDeDescarga && destinoDeDescarga.nombreEstablecimiento ? destinoDeDescarga.nombreEstablecimiento: ''; 
  }

  obtenerOrdenDeCarga(id: number){
     this._ordenDeCargaService.getOrdenDeCarga(id).subscribe({
      next: data=>{
        this.form.patchValue({
          cliente: data.cliente,
          destinoDeCarga: data.destinoDeCarga,
          destinoDeDescarga: data.destinoDeDescarga,
          distanciaViaje: data.distanciaViaje,
          diaHoraCarga: data.diaHoraCarga,
          tipoMercaderia: data.tipoMercaderia
        })
      }
     })
  }

  agregarEditarOrdenDeCarga(){
    const ordenDeCarga: OrdenDeCarga = {
      cliente: this.form.value.cliente,
      destinoDeCarga: this.form.value.destinoDeCarga,
      destinoDeDescarga: this.form.value.destinoDeDescarga,
      distanciaViaje: this.form.value.distanciaViaje,
      diaHoraCarga: this.form.value.diaHoraCarga,
      tipoMercaderia: this.form.value.tipoMercaderia 
    }
    
    if(this.id != 0){
      ordenDeCarga.id = this.id;
       this.editarOrdenDeCarga(this.id, ordenDeCarga);
    }else{
      this.agregarOrdenDeCarga(ordenDeCarga);
    }

  }

  editarOrdenDeCarga(id: number, ordenDeCarga: OrdenDeCarga){
    this._ordenDeCargaService.updateOrdenDeCarga(id, ordenDeCarga).subscribe(()=>{
         this.mensajeExito('editada');
         this.router.navigate(['/listOrdenDeCarga']);
    })
  }

  agregarOrdenDeCarga(ordenDeCarga: OrdenDeCarga){
    this._ordenDeCargaService.addOrdenDeCarga(ordenDeCarga).subscribe(()=>{
         this.mensajeExito('registrada');
         this.router.navigate(['/listOrdenDeCarga']);
    })
  }

  mensajeExito(texto: string){
    this._snackBar.open(`La Orden De Carga fue ${texto} con éxito!`, '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

}


