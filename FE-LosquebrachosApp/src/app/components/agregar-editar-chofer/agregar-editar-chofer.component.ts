import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Chofer } from 'src/app/interfaces/chofer';
import { ChoferService } from 'src/app/services/chofer.service';
import { TransporteService } from 'src/app/services/transporte.service';
import { fromEvent, debounceTime, distinctUntilChanged, tap, finalize } from 'rxjs';
import { Transporte } from 'src/app/interfaces/transporte';



@Component({
  selector: 'app-agregar-editar-chofer',
  templateUrl: './agregar-editar-chofer.component.html',
  styleUrls: ['./agregar-editar-chofer.component.css']
})
export class AgregarEditarChoferComponent implements OnInit {

  transportes: Transporte[] = [];
  selectedTransporte: any = "";

  @ViewChild('input') input: ElementRef;

  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';
  
  constructor(private fb: FormBuilder, private _choferService: ChoferService, private _snackBar: MatSnackBar, private router: Router, private aRoute: ActivatedRoute, private _transporteService: TransporteService,) { 

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cuit: ['', Validators.required],
      transporte: ['', Validators.required]
    })
    
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  onSelected(){
    this.selectedTransporte = this.selectedTransporte;
  }

  clearSelection(){
    this.selectedTransporte = "";
    this.transportes = [];
  }

  ngOnInit(): void {
   

    if (this.id != 0){
      this.operacion = 'Editar';
      this.obtenerChofer(this.id);
    }
 
  }

  ngAfterViewInit(){
  
    fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.loadTransportes(this.input.nativeElement.value);
                })
            )
            .subscribe();

  }

  loadTransportes(query = ''){
     this._transporteService.getTransportes(query).subscribe({
      next: response =>{
         this.transportes = response.data;
      }
     })
  }

  displayTransporte(transporte: Transporte): string {
    return transporte && transporte.nombre + " " + transporte.apellido ? transporte.nombre + " " + transporte.apellido: '';
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
      transporte: this.form.value.transporte,
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