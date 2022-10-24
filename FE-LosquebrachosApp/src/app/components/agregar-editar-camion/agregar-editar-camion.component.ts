import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';

@Component({
  selector: 'app-agregar-editar-camion',
  templateUrl: './agregar-editar-camion.component.html',
  styleUrls: ['./agregar-editar-camion.component.css']
})
export class AgregarEditarCamionComponent implements OnInit{

  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _vehiculoService: CamionService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      chasis: ['', Validators.required],
      acoplado: ['', Validators.required],
      tipo: ['', Validators.required],
      capacidadTN: ['', Validators.required]
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {

    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerVehiculo(this.id);
    }
  }

  obtenerVehiculo(id: number){
     this._vehiculoService.getVehiculo(id).subscribe({
      next: data=>{
        this.form.patchValue({
          acoplado: data.acoplado,
          chasis: data.chasis,
          tipo: data.tipo,
          capacidadTN: data.capacidadTN
        })
      }
     })
  }

  agregarEditarVehiculo(){
    const vehiculo: Camion = {
      chasis: this.form.value.chasis,
      acoplado: this.form.value.acoplado,
      tipo: this.form.value.tipo,
      capacidadTN: this.form.value.capacidadTN
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