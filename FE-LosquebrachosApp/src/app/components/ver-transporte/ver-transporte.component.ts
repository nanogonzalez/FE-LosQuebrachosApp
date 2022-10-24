import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transporte } from 'src/app/interfaces/transporte';
import { TransporteService } from 'src/app/services/transporte.service';

@Component({
  selector: 'app-ver-transporte',
  templateUrl: './ver-transporte.component.html',
  styleUrls: ['./ver-transporte.component.css']
})
export class VerTransporteComponent implements OnInit {

  id: number;
  transporte!: Transporte;

  constructor(private _transporteService: TransporteService,
              private _aRoute: ActivatedRoute) {
              this.id = Number(this._aRoute.snapshot.paramMap.get('id')); 
     }

  ngOnInit(): void {
    this.obtenerTransporte();
  }

  obtenerTransporte(){
    this._transporteService.getTransporte(this.id).subscribe({
      next: data=>{
          this.transporte = data;
      }
    })
  }

}
