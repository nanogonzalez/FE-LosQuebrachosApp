import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camion } from 'src/app/interfaces/camion';
import { CamionService } from 'src/app/services/camion.service';

@Component({
  selector: 'app-ver-camion',
  templateUrl: './ver-camion.component.html',
  styleUrls: ['./ver-camion.component.css']
})
export class VerCamionComponent implements OnInit {

  id: number;
  camion!: Camion;

  constructor(private _vehiculoService: CamionService,
              private _aRoute: ActivatedRoute) { 
                this.id = Number(this._aRoute.snapshot.paramMap.get('id')); 
              }

  ngOnInit(): void {
  }

  obtenerVehiculo(){
    this._vehiculoService.getVehiculo(this.id).subscribe({
      next: data=>{
        this.camion = data;
      }
    })
  }
}
