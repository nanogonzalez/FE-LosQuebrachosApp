import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenDeCarga } from 'src/app/interfaces/orden-de-carga';
import { OrdenDeCargaService } from 'src/app/services/orden-de-carga.service';

@Component({
  selector: 'app-agregar-editar-orden-de-carga',
  templateUrl: './agregar-editar-orden-de-carga.component.html',
  styleUrls: ['./agregar-editar-orden-de-carga.component.css']
})
export class AgregarEditarOrdenDeCargaComponent implements OnInit {
  
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _ordenDeCargaService: OrdenDeCargaService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) {
    
    this.form = this.fb.group({
      destinoCarga: ['', Validators.required],
      destinoDescarga: ['', Validators.required],
      diaCarga: ['', Validators.required],
      horaCarga: ['', Validators.required],
      tipoMercaderia: ['', Validators.required],
    })

   this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

   }

  ngOnInit(): void {
   
    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerOrdenDeCarga(this.id);
    }

  }

  obtenerOrdenDeCarga(id: number){
     this._ordenDeCargaService.getOrdenDeCarga(id).subscribe({
      next: data=>{
        this.form.patchValue({
          destinoCarga: data.destinoCarga,
          destinoDescarga: data.destinoDescarga,
          diaCarga: data.diaCarga,
          horaCarga: data.horaCarga,
          tipoMercaderia: data.tipoMercaderia
        })
      }
     })
  }

  agregarEditarOrdenDeCarga(){
    const ordenDeCarga: OrdenDeCarga = {
      destinoCarga: this.form.value.destinoCarga,
      destinoDescarga: this.form.value.destinoDescarga,
      diaCarga: this.form.value.diaCarga,
      horaCarga: this.form.value.horaCarga,
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
