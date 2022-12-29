import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Camion } from 'src/app/interfaces/camion';
import { Transporte } from 'src/app/interfaces/transporte';
import { CamionService } from 'src/app/services/camion.service';
import { TransporteService } from 'src/app/services/transporte.service';

interface Capacidad {
  value: number,
  viewValue: number
}
interface Tipo {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-agregar-editar-camion',
  templateUrl: './agregar-editar-camion.component.html',
  styleUrls: ['./agregar-editar-camion.component.css']
})
export class AgregarEditarCamionComponent implements OnInit{

  transportes: Transporte[] = [];
  filteredTransportes: Observable<Transporte[]>;

  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  capacidades: Capacidad[] = [
    {value: 30, viewValue: 30},
    {value: 36, viewValue: 36}
  ]

  tipos: Tipo[] = [
    {value: 'Chasis y Acoplado', viewValue: 'Chasis y Acoplado'},
    {value: 'Chasis y Acoplado Escalable', viewValue: 'Chasis y Acoplado Escalable'},
    {value: 'Batea', viewValue: 'Batea'},
    {value: 'Batea Escalable', viewValue: 'Batea Escalable'},
    {value: 'Semi', viewValue: 'Semi'},
    {value: 'Semi Escalable', viewValue: 'Semi Escalable'},
  ]

  constructor(private fb: FormBuilder, private _vehiculoService: CamionService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _transporteService: TransporteService) {
    this.form = this.fb.group({
      chasis: ['', Validators.required],
      acoplado: ['', Validators.required],
      tipo: ['', Validators.required],
      capacidadTN: ['', Validators.required],
      transporte: ['', Validators.required]
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }

  ngOnInit(): void {

    this.obtenerTransporte();

   if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerVehiculo(this.id);
    }

    this.filteredTransportes = this.form.get("transporte").valueChanges.pipe(
      startWith(''),
      map(value => {
        const transporte = typeof value === 'string' ? value : value?.apellido;
        return transporte ? this._filterTransporte(transporte as string) : this.transportes.slice();
      }),
    ); 
  }

  displayTransporte(transporte: Transporte): string {
    return transporte && transporte.nombre + " " + transporte.apellido ? transporte.nombre + " " + transporte.apellido: '';
  }

  private _filterTransporte(apellido: string): Transporte[] {
    const filterValue = apellido.toLowerCase();

    return this.transportes.filter(transporte => transporte.apellido.toLowerCase().includes(filterValue));
  }

  
  obtenerTransporte(){
    this._transporteService.getTransportes().subscribe({
      next: response =>{
         this.transportes = response.data;
      }
    })
  }

  obtenerVehiculo(id: number){
     this._vehiculoService.getVehiculo(id).subscribe({
      next: data=>{
        this.form.patchValue({
          acoplado: data.acoplado,
          chasis: data.chasis,
          tipo: data.tipo,
          capacidadTN: data.capacidadTN,
          transporte: data.transporte
        })
      }
     })
  }

  agregarEditarVehiculo(){
    const vehiculo: Camion = {
      chasis: this.form.value.chasis,
      acoplado: this.form.value.acoplado,
      tipo: this.form.value.tipo,
      capacidadTN: this.form.value.capacidadTN,
      transporte: this.form.value.transporte
    }
   
    if (this.id != 0){
      vehiculo.id = this.id;
      this.editarVehiculo(this.id, vehiculo);
    }else{
      this.agregarVehiculo(vehiculo);
    }

  }

  editarVehiculo(id: number, camion: Camion){
      this._vehiculoService.updateVehiculo(id, camion).subscribe(()=>{
          this.mensajeExito('editado');
          this.router.navigate(['/listVehiculo']);
      })  
  }

  agregarVehiculo(camion: Camion){
     this._vehiculoService.addVehiculo(camion).subscribe(()=>{
          this.mensajeExito('registrado');
          this.router.navigate(['/listVehiculo']);
     })
  }

  mensajeExito(texto: string){
    this._snackBar.open(`El Vehículo fue ${texto} con éxito!`, '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }


}