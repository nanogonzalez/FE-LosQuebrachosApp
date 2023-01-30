import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenDeGasoil } from 'src/app/interfaces/orden-de-gasoil';
import { OrdenDeGasoilService } from 'src/app/services/orden-de-gasoil.service';

@Component({
  selector: 'app-ver-orden-de-gasoil',
  templateUrl: './ver-orden-de-gasoil.component.html',
  styleUrls: ['./ver-orden-de-gasoil.component.css']
})
export class VerOrdenDeGasoilComponent implements OnInit {

  id: number;
  ordenDeGasoil!: OrdenDeGasoil;

  constructor(private _ordenDeGasoilService: OrdenDeGasoilService, private _aRoute: ActivatedRoute) {
    this.id = Number(this._aRoute.snapshot.paramMap.get('id')); 
   }

  ngOnInit(): void {
    this.obtenerOrdenDeGasoil();
  }

   obtenerOrdenDeGasoil(){
    this._ordenDeGasoilService.getOrdenDeGasoil(this.id).subscribe({
      next: data=>{
        this.ordenDeGasoil = data;
      }
    })
  }
}
