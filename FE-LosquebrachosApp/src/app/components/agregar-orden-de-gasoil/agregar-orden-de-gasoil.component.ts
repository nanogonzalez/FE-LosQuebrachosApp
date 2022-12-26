import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
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

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  transportes: Transporte[] = [];
  filteredTransportes: Observable<Transporte[]>;

  camiones: Camion[] = [];
  filteredChasis: Observable<Camion[]>;

  choferes: Chofer[] = [];
  filteredChoferes: Observable<Chofer[]>;

  constructor(private fb: FormBuilder, private _ordenDeGasoilService: OrdenDeGasoilService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _transporteService: TransporteService, private _choferService: ChoferService, private _camionService: CamionService) { 
    this.form = this.fb.group({
      numeroOrden: ['', Validators.required],
      fecha: ['', Validators.required],
      chofer: ['', Validators.required],
      chasis: ['', Validators.required],
      transporte: ['', Validators.required],
      cuitTransporte: ['', Validators.required],
      litros: ['', Validators.required],
      estacion: ['', Validators.required],
    })

   this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }
  

  ngOnInit(): void {

    this.obtenerTransporte();

    this.obtenerChofer();

    this.obtenerCamion();

    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerOrdenDeGasoil(this.id);
    }

    this.filteredTransportes = this.form.get("transporte").valueChanges.pipe(
      startWith(''),
      map(value => {
        const transporte = typeof value === 'string' ? value : value?.apellido;
        return transporte ? this._filterTransporte(transporte as string) : this.transportes.slice();
      }),
    ); 

    this.filteredChasis = this.form.get("chasis").valueChanges.pipe(
      startWith(''),
      map(value => {
        const chasis = typeof value === 'string' ? value : value?.chasis;
        return chasis ? this._filterChasis(chasis as string) : this.camiones.slice();
      }),
    ); 

    this.filteredChoferes = this.form.get("chofer").valueChanges.pipe(
      startWith(''),
      map(value => {
        const chofer = typeof value === 'string' ? value : value?.apellido;
        return chofer ? this._filterChofer(chofer as string) : this.choferes.slice();
      }),
    ); 

  }

  displayTransporte(transporte: Transporte): string {
    return transporte && transporte.nombre + " " + transporte.apellido ? transporte.nombre + " " + transporte.apellido: '';
  }

  displayChofer(chofer: Chofer): string {
    return chofer && chofer.nombre + " " + chofer.apellido ? chofer.nombre + " " + chofer.apellido: '';
  }

  displayChasis(chasis: Camion): string {
    return chasis && chasis.chasis ? chasis.chasis: '';
  }

  private _filterTransporte(apellido: string): Transporte[] {
    const filterValue = apellido.toLowerCase();

    return this.transportes.filter(transporte => transporte.apellido.toLowerCase().includes(filterValue));
  }

  private _filterChasis(chasis: string): Camion[] {
    const filterValue = chasis.toLowerCase();

    return this.camiones.filter(chasis => chasis.chasis.toLowerCase().includes(filterValue));
  }

  private _filterChofer(chofer: string): Chofer[] {
    const filterValue = chofer.toLowerCase();

    return this.choferes.filter(chofer => chofer.apellido.toLowerCase().includes(filterValue));
  }

  obtenerOrdenDeGasoil(id: number){
    this._ordenDeGasoilService.getOrdenDeGasoil(id).subscribe({
     next: data=>{
       this.form.patchValue({
        numeroOrden: data.numeroOrden,
        fecha: data.fecha,
        chofer: data.chofer,
        chasis: data.chasis,
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
    numeroOrden: this.form.value.numeroOrden,
    fecha: this.form.value.fecha,
    chofer: this.form.value.chofer,
    chasis: this.form.value.chasis,
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

obtenerTransporte(){
  this._transporteService.getTransportes().subscribe({
    next: data =>{
       this.transportes = data.data;
    }
  })
}

obtenerChofer(){
  this._choferService.getChoferes().subscribe({
    next: data =>{
       this.choferes = data.data;
    }
  })
}

obtenerCamion(){
  this._camionService.getVehiculos().subscribe({
    next: data =>{
       this.camiones = data.data;
    }
  })
}

}
