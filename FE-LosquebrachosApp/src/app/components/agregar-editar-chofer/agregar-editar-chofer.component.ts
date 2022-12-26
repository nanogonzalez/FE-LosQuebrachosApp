import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Chofer } from 'src/app/interfaces/chofer';
import { Transporte } from 'src/app/interfaces/transporte';
import { ChoferService } from 'src/app/services/chofer.service';
import { TransporteService } from 'src/app/services/transporte.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';


@Component({
  selector: 'app-agregar-editar-chofer',
  templateUrl: './agregar-editar-chofer.component.html',
  styleUrls: ['./agregar-editar-chofer.component.css']
})
export class AgregarEditarChoferComponent implements OnInit {

  transportes: Transporte[] = [];

  filteredTransportes: Observable<Transporte[]>;
  transporteControl = new FormControl<string | Transporte>('');

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';
  
  constructor(private fb: FormBuilder, private _choferService: ChoferService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _transporteService: TransporteService) { 

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cuit: ['', Validators.required],
      transporte: ['', Validators.required]
    })

    

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }



  ngOnInit(): void {
   
    this.obtenerTransporte();

    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerChofer(this.id);
    }
 
    this.filteredTransportes = this.transporteControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const apellido = typeof value === 'string' ? value : value?.apellido;
        return apellido ? this._filter(apellido as string) : this.transportes.slice();
      }),
    ); 

  }

  displayFn(transporte: Transporte): string {
    return transporte && transporte.nombre + " " + transporte.apellido ? transporte.nombre + " " + transporte.apellido: '';
  }

  private _filter(apellido: string): Transporte[] {
    const filterValue = apellido.toLowerCase();

    return this.transportes.filter(transporte => transporte.apellido.toLowerCase().includes(filterValue));
  }


  obtenerChofer(id: number){
     this._choferService.getChofer(id).subscribe({
      next: data=>{
        this.form.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          cuit: data.cuit,
          transporte: data.transporte
        })
      }
     })
  }

  agregarEditarChofer(){
    const chofer: Chofer = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      cuit: this.form.value.cuit,
      transporte: this.form.value.transporte
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

  obtenerTransporte(){
    this._transporteService.getTransportes().subscribe({
      next: data =>{
         this.transportes = data.data;
      }
    })
  }
}