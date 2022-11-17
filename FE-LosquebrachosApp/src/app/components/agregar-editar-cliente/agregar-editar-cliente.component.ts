import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Transporte } from 'src/app/interfaces/transporte';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-agregar-editar-cliente',
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrls: ['./agregar-editar-cliente.component.css']
})
export class AgregarEditarClienteComponent implements OnInit {

  transportes: Transporte[] = [
    
  ];

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder, private _clienteService: ClienteService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute) { 

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
      this.obtenerCliente(this.id);
    }
  }

  obtenerCliente(id: number){
    this._clienteService.getCliente(id).subscribe({
     next: data=>{
       this.form.patchValue({
         razonSocial: data.razonSocial,
         cuit: data.cuit,
         destinoCarga: data.destinoCarga
       })
     }
    })
 }
 agregarEditarCliente(){
  const cliente: Cliente = {
    razonSocial: this.form.value.razonSocial,
    cuit: this.form.value.cuit,
    destinoCarga: this.form.value.destinoCarga 
  }
  if (this.id != 0){
    cliente.id = this.id;
    this.editarCliente(this.id, cliente);
 }else{
   this.agregarCliente(cliente);
 }
}
editarCliente(id: number, cliente: Cliente){
  this._clienteService.updateCliente(id, cliente).subscribe({
   next: data=>{
       this.mensajeExito('editado'); 
       this.router.navigate(['/listCliente']); 
   }
  })
}

agregarCliente(cliente: Cliente){
   this._clienteService.addCliente(cliente).subscribe({
     next: data=>{
       this.mensajeExito('registrado');
       this.router.navigate(['/listCliente']);
     }
   })
}
mensajeExito(texto: string){
  this._snackBar.open(`El Cliente fue ${texto} con éxito!`, '' ,{
    duration: 2000,
    horizontalPosition: 'left'
 });
}

}

