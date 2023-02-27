import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  mostrarImagen = true;
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

  public nombreUsuario: string = "";
  public role: string = "";

  constructor(private _authService: AuthService, private _usersService: UsersService, private _userStoreService: UserStoreService) {

   }

   ngOnInit(): void {
     this._userStoreService.getNombreUsuarioFromStore().subscribe(
      val =>{
        const nombreUsuarioFromToken = this._authService.getNombreUsuarioFromToken();
        this.nombreUsuario = val || nombreUsuarioFromToken;
      }
     );

     this._userStoreService.getRoleFromStore().subscribe(
      val =>{
        const roleFromtoken = this._authService.getRoleFromToken();
        this.role = val || roleFromtoken;
      }
     )
   }

   cerrarSesion(){
      this._authService.logout();
   }

}
