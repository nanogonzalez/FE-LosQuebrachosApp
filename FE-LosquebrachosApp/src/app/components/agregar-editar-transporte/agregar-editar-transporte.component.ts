import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Transporte } from 'src/app/interfaces/transporte';
import { TransporteService } from 'src/app/services/transporte.service';

@Component({
  selector: 'app-agregar-editar-transporte',
  templateUrl: './agregar-editar-transporte.component.html',
  styleUrls: ['./agregar-editar-transporte.component.css']
})
export class AgregarEditarTransporteComponent implements OnInit {

  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _transporteService: TransporteService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) {
    
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cuit: ['', Validators.required]
    })

   this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }

  ngOnInit(): void {
   
    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerTransporte(this.id);
    }

  }

  obtenerTransporte(id: number){
     this._transporteService.getTransporte(id).subscribe({
      next: data=>{
        this.form.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            cuit: data.cuit
        })
      }
     })
  }

  agregarEditarTransporte(){
    const transporte: Transporte = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      cuit: this.form.value.cuit  
    }
    
    if(this.id != 0){
       transporte.id = this.id;
       this.editarTransporte(this.id, transporte);
    }else{
      this.agregarTransporte(transporte);
    }

  }

  editarTransporte(id: number, transporte: Transporte){
    this._transporteService.updateTransporte(id, transporte).subscribe(()=>{
         this.mensajeExito('editado');
         this.router.navigate(['/listTransporte']);
    })
  }

  agregarTransporte(transporte: Transporte){
    this._transporteService.addTransporte(transporte).subscribe(()=>{
         this.mensajeExito('registrado');
         this.router.navigate(['/listTransporte']);
    })
  }

  mensajeExito(texto: string){
    this._snackBar.open(`El Transporte fue ${texto} con éxito!`, '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }

}

