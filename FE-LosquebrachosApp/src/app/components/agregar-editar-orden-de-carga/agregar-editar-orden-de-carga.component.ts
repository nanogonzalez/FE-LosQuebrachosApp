import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenDeCarga } from 'src/app/interfaces/orden-de-carga';
import { OrdenDeCargaService } from 'src/app/services/orden-de-carga.service';

interface Mercaderia {
  value: string,
  viewValue: string
}

 export interface PlaceSearchResult {
   address: string;
   location?: google.maps.LatLng; 
 }

@Component({
  selector: 'app-agregar-editar-orden-de-carga',
  templateUrl: './agregar-editar-orden-de-carga.component.html',
  styleUrls: ['./agregar-editar-orden-de-carga.component.css']
})
export class AgregarEditarOrdenDeCargaComponent implements OnInit {

  @ViewChild('inputFieldFrom')
  inputFieldFrom!: ElementRef;

  @ViewChild('inputFieldTo')
  inputFieldTo!: ElementRef;

  @Input() placeholder = ''

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  fromValue: PlaceSearchResult | undefined;
 
  map!: google.maps.Map;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 14
  }

  
  originPlaceId: string;
  destinationPlaceId: string;
  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  
  
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

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _ordenDeCargaService: OrdenDeCargaService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private ngZone: NgZone) {

    this.map = this.map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsRenderer.setMap(this.map);
    
    this.form = this.fb.group({
      destinoCarga: ['', Validators.required],
      destinoDescarga: ['', Validators.required],
      diaHoraCarga: ['', Validators.required],
      tipoMercaderia: ['', Validators.required],
    })

   this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }


  ngOnInit(): void {

   
    navigator.geolocation.getCurrentPosition(position =>{
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.map = new google.maps.Map(document.getElementById('map'), {
        ...this.options,
        center: this.center
      });


      var markerStar = new google.maps.Marker({
        position: this.center,
        map: this.map
      });

      const originInput = document.getElementById(
        "origin-input"
      ) as HTMLInputElement;
      const destinationInput = document.getElementById(
        "destination-input"
      ) as HTMLInputElement;
      const modeSelector = document.getElementById(
        "mode-selector"
      ) as HTMLSelectElement;

      // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );

    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );
    
    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  
  });
    

   
    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerOrdenDeCarga(this.id);
     
    }

  }
   
  setupClickListener(id: string, mode: google.maps.TravelMode) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }

setupPlaceChangedListener(
autocomplete: google.maps.places.Autocomplete,
mode: string) {
autocomplete.bindTo("bounds", this.map);

autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();

  if (!place.place_id) {
    window.alert("Please select an option from the dropdown list.");
    return;
  }

  if (mode === "ORIG") {
    this.originPlaceId = place.place_id;
  } else {
    this.destinationPlaceId = place.place_id;
  }

  this.route();
});
}

route() {
if (!this.originPlaceId || !this.destinationPlaceId) {
  return;
}

const me = this;

this.directionsService.route(
  {
    origin: { placeId: this.originPlaceId },
    destination: { placeId: this.destinationPlaceId },
    travelMode: this.travelMode,
  },
  (response, status) => {
    if (status === "OK") {
      me.directionsRenderer.setDirections(response);
    } else {
      window.alert("Directions request failed due to " + status);
    }
  }
);

}



  obtenerOrdenDeCarga(id: number){
     this._ordenDeCargaService.getOrdenDeCarga(id).subscribe({
      next: data=>{
        this.form.patchValue({
          destinoCarga: data.destinoCarga,
          destinoDescarga: data.destinoDescarga,
          diaHoraCarga: data.diaHoraCarga,
          tipoMercaderia: data.tipoMercaderia
        })
      }
     })
  }

  agregarEditarOrdenDeCarga(){
    const ordenDeCarga: OrdenDeCarga = {
      destinoCarga: this.form.value.destinoCarga,
      destinoDescarga: this.form.value.destinoDescarga,
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

  ngAfterViewInit(){

     
   /* this.autocomplete = new google.maps.places.Autocomplete(this.inputFieldFrom.nativeElement);

     this.autocomplete.addListener('place_changed', ()=>{
      this.ngZone.run(() => {
      const place = this.autocomplete?.getPlace();
      const result: PlaceSearchResult = {
        address: this.inputFieldFrom.nativeElement.value,
        location: place?.geometry?.location
      }
        this.placeChanged.emit(result);
     });
    });

    this.autocomplete = new google.maps.places.Autocomplete(this.inputFieldTo.nativeElement);

     this.autocomplete.addListener('place_changed', ()=>{
      this.ngZone.run(() => {
      const place = this.autocomplete?.getPlace();
      const result: PlaceSearchResult = {
        address: this.inputFieldTo.nativeElement.value,
        location: place?.geometry?.location
      }
        this.placeChanged.emit(result);
     });
    });*/

  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }

}


