import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, tap } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { DestinoDeCarga } from 'src/app/interfaces/destino-de-carga';
import { ClienteService } from 'src/app/services/cliente.service';
import { DestinoDeCargaService } from 'src/app/services/destinoDeCarga.service';

@Component({
  selector: 'app-agregar-editar-destino-de-carga',
  templateUrl: './agregar-editar-destino-de-carga.component.html',
  styleUrls: ['./agregar-editar-destino-de-carga.component.css']
})
export class AgregarEditarDestinoDeCargaComponent implements OnInit {

  map: google.maps.Map;
  marker: google.maps.Marker;

  latitud: number = null;
  longitud: number = null;

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  clientes: Cliente[] = [];
  selectedCliente: any = '';

  @ViewChild('input') input: ElementRef;

  @ViewChild('mapRef', { static: true }) mapRef: ElementRef;

  constructor(private fb: FormBuilder, private _destinoDeCargaService: DestinoDeCargaService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _clienteService: ClienteService) {

    this.form = this.fb.group({
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      nombreEstablecimiento: ['', Validators.required],
      cliente: ['', Validators.required]
    });
 
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

   onSelected(){
    this.selectedCliente = this.selectedCliente;
   }

   clearSelection(){
    this.selectedCliente = "";
    this.clientes = [];
   }

  ngOnInit(): void {
 
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      center: { lat: -27.21667, lng: -61.2 },
      zoom: 8
  });

  this.map.addListener('click', (event) => {
      this.latitud = event.latLng.lat();
      this.longitud = event.latLng.lng();
      this.marker = new google.maps.Marker({
          position: event.latLng,
          map: this.map
      });
  });

  }

  ngAfterViewInit(){
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                  this.loadClientes(this.input.nativeElement.value);
                })
                )
                .subscribe();
  }

  loadClientes(query = ''){
    this._clienteService.getClientes(query).subscribe({
      next: response =>{
        this.clientes = response.data;
      }
    })
  }

  displayCliente(cliente: Cliente): string{
    return cliente && cliente.razonSocial ? cliente.razonSocial: '';
  }

  obtenerDestinoDeCarga(id: number){
     this._destinoDeCargaService.getDestinoDeCarga(id).subscribe({
      next: data =>{
        this.form.get('latitud').setValue(data.latitud);
        this.form.get('longitud').setValue(data.longitud);
        this.form.get('nombreEstablecimiento').setValue(data.nombreEstablecimiento);
        this.form.get('cliente').setValue(data.cliente);
      }
     });
  }

  agregarEditarDestinoDeCarga(){
    const destinoDeCarga: DestinoDeCarga = {
      latitud: this.form.value.latitud,
      longitud: this.form.value.longitud,
      nombreEstablecimiento: this.form.value.nombreEstablecimiento,
      cliente: this.form.value.cliente
    }
    if (this.id != 0){
      destinoDeCarga.id = this.id;
      this.editarDestinoDeCarga(this.id, destinoDeCarga)
    }else{
      this.agregarDestinoDeCarga(destinoDeCarga);
    }
  }

  editarDestinoDeCarga(id: number, destinoDeCarga: DestinoDeCarga){
     this._destinoDeCargaService.updateDestinoDeCarga(id, destinoDeCarga).subscribe({
      next: data =>{
        this.mensajeExito('editado');
        this.router.navigate(['/listDestinoDeCarga']);
      }
     })
  }

  agregarDestinoDeCarga(destinoDeCarga: DestinoDeCarga){
    this._destinoDeCargaService.addDestinoDeCarga(destinoDeCarga).subscribe({
      next: data =>{
        this.mensajeExito('registrado');
        this.router.navigate(['/listDestinoDeCarga']);
      }
    })
  } 

  mensajeExito(texto: string){
    this._snackBar.open(`El Destino de Carga fue ${texto} con éxito!`, '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

  clearMarker() {
    this.marker.setMap(null);
    this.marker = null;
    this.latitud = null;
    this.longitud = null;
}

}
