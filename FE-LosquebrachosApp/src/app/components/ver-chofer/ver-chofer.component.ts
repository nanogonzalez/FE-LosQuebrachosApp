import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chofer } from 'src/app/interfaces/chofer';
import { ChoferService } from 'src/app/services/chofer.service';

@Component({
  selector: 'app-ver-chofer',
  templateUrl: './ver-chofer.component.html',
  styleUrls: ['./ver-chofer.component.css']
})
export class VerChoferComponent implements OnInit{

  id: number;
  chofer!: Chofer;

  constructor(private _choferService: ChoferService,
    private _aRoute: ActivatedRoute) { 
      this.id = Number(this._aRoute.snapshot.paramMap.get('id')); 
    }

  ngOnInit(): void {
     this.obtenerChofer();   
  }

  obtenerChofer(){
    this._choferService.getChofer(this.id).subscribe({
     next: data=>{
       this.chofer = data;
     }
       })
     }
  
}