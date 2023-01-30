import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  opened = true;

   links = [
    {nombre: "Listado de Transportes"},
    {nombre: "Listado de Choferes"},
    {nombre: "Listado de Vehículos"},
    {nombre: "Listado de Clientes"},
    {nombre: "Ordenes de Carga"},
    {nombre: "Ordenes de Gasoil"},
    {nombre: "Puntos De Carga"},
    {nombre: "Puntos De Descarga"},
  ]

  constructor(public auth: AuthService) {

   }

 
  logOut() {
    this.auth.logout()
  }
   ngOnInit(): void {
     
   }
}
