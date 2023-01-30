import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinoDeDescarga } from 'src/app/interfaces/destino-de-descarga';
import { DestinoDeDescargaService } from 'src/app/services/destinoDeDescarga.service';

@Component({
  selector: 'app-agregar-editar-destino-de-descarga',
  templateUrl: './agregar-editar-destino-de-descarga.component.html',
  styleUrls: ['./agregar-editar-destino-de-descarga.component.css']
})
export class AgregarEditarDestinoDeDescargaComponent implements OnInit {

  map: google.maps.Map;
  marker: google.maps.Marker;

  latitud: number = null;
  longitud: number = null;

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  @ViewChild('input') input: ElementRef;

  @ViewChild('mapRef', { static: true }) mapRef: ElementRef;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _destinoDeDescargaService: DestinoDeDescargaService) {

    this.form = this.fb.group({
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      nombreEstablecimiento: ['', Validators.required]
    });
 
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
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

  obtenerDestinoDeCarga(id: number){
    this._destinoDeDescargaService.getDestinoDeDescarga(id).subscribe({
     next: data =>{
       this.form.get('latitud').setValue(data.latitud);
       this.form.get('longitud').setValue(data.longitud);
       this.form.get('nombreEstablecimiento').setValue(data.nombreEstablecimiento);
     }
    });
 }

 agregarEditarDestinoDeDescarga(){
   const destinoDeDescarga: DestinoDeDescarga = {
     latitud: this.form.value.latitud,
     longitud: this.form.value.longitud,
     nombreEstablecimiento: this.form.value.nombreEstablecimiento
   }
   if (this.id != 0){
    destinoDeDescarga.id = this.id;
     this.editarDestinoDeDescarga(this.id, destinoDeDescarga)
   }else{
     this.agregarDestinoDeDescarga(destinoDeDescarga);
   }
 }

 editarDestinoDeDescarga(id: number, destinoDeDescarga: DestinoDeDescarga){
    this._destinoDeDescargaService.updateDestinoDeDescarga(id, destinoDeDescarga).subscribe({
     next: data =>{
       this.mensajeExito('editado');
       this.router.navigate(['/listDestinoDeDescarga']);
     }
    })
 }

 agregarDestinoDeDescarga(destinoDeDescarga: DestinoDeDescarga){
   this._destinoDeDescargaService.addDestinoDeDescarga(destinoDeDescarga).subscribe({
     next: data =>{
       this.mensajeExito('registrado');
       this.router.navigate(['/listDestinoDeDescarga']);
     }
   })
 } 

 mensajeExito(texto: string){
   this._snackBar.open(`El Destino de Descarga fue ${texto} con éxito!`, '' ,{
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
