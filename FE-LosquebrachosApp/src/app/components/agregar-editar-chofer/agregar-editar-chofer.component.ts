import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Chofer } from 'src/app/interfaces/chofer';
import { ChoferService } from 'src/app/services/chofer.service';

@Component({
  selector: 'app-agregar-editar-chofer',
  templateUrl: './agregar-editar-chofer.component.html',
  styleUrls: ['./agregar-editar-chofer.component.css']
})
export class AgregarEditarChoferComponent implements OnInit {

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _choferService: ChoferService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) { 

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
      this.obtenerChofer(this.id);
    }
  }
  
  obtenerChofer(id: number){
     this._choferService.getChofer(id).subscribe({
      next: data=>{
        this.form.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          cuit: data.cuit
        })
      }
     })
  }

  agregarEditarChofer(){
    const chofer: Chofer = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      cuit: this.form.value.cuit
    }

    if (this.id != 0){
       chofer.id = this.id;
       this.editarChofer(this.id, chofer);
    }else{
      this.agregarChofer(chofer);
    }
  }
 
  editarChofer(id: number, chofer: Chofer){
     this._choferService.updateChofer(id, chofer).subscribe({
      next: data=>{
          this.mensajeExito('editado'); 
          this.router.navigate(['/listChofer']); 
      }
     })
  }

  agregarChofer(chofer: Chofer){
      this._choferService.addChofer(chofer).subscribe({
        next: data=>{
          this.mensajeExito('registrado');
          this.router.navigate(['/listChofer']);
        }
      })
  }

  mensajeExito(texto: string){
    this._snackBar.open(`El Chofer fue ${texto} con éxito!`, '' ,{
      duration: 2000,
      horizontalPosition: 'left'
   });
  }
}
