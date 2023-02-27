import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarCamionComponent } from './components/agregar-editar-camion/agregar-editar-camion.component';
import { AgregarEditarChoferComponent } from './components/agregar-editar-chofer/agregar-editar-chofer.component';
import { AgregarEditarClienteComponent } from './components/agregar-editar-cliente/agregar-editar-cliente.component';
import { AgregarEditarDestinoDeCargaComponent } from './components/agregar-editar-destino-de-carga/agregar-editar-destino-de-carga.component';
import { AgregarEditarDestinoDeDescargaComponent } from './components/agregar-editar-destino-de-descarga/agregar-editar-destino-de-descarga.component';
import { AgregarEditarOrdenDeCargaComponent } from './components/agregar-editar-orden-de-carga/agregar-editar-orden-de-carga.component';
import { AgregarEditarTransporteComponent } from './components/agregar-editar-transporte/agregar-editar-transporte.component';
import { AgregarOrdenDeGasoilComponent } from './components/agregar-orden-de-gasoil/agregar-orden-de-gasoil.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { ListadoCamionComponent } from './components/listado-camion/listado-camion.component';
import { ListadoChoferComponent } from './components/listado-chofer/listado-chofer.component';
import { ListadoClienteComponent } from './components/listado-cliente/listado-cliente.component';
import { ListadoDestinoDeCargaComponent } from './components/listado-destino-de-carga/listado-destino-de-carga.component';
import { ListadoDestinoDeDescargaComponent } from './components/listado-destino-de-descarga/listado-destino-de-descarga.component';
import { ListadoOrdenDeCargaComponent } from './components/listado-orden-de-carga/listado-orden-de-carga.component';
import { ListadoOrdenDeGasoilComponent } from './components/listado-orden-de-gasoil/listado-orden-de-gasoil.component';
import { ListadoTransporteComponent } from './components/listado-transporte/listado-transporte.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ResetComponent } from './components/reset/reset.component';
import { SingupComponent } from './components/singup/singup.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
{ path: 'welcome', component: WelcomePageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'singup', component: SingupComponent },
{ path: 'resetPassword', component: ForgotPassComponent },
{ path: 'reset', component: ResetComponent },
{ path: 'mainMenu', component: MainMenuComponent, canActivate:[AuthGuard] },
{ path: '', component: MainMenuComponent,  
children: [
    { path: 'agregarTransporte', component: AgregarEditarTransporteComponent },
    { path: 'editarTransporte/:id', component: AgregarEditarTransporteComponent },
    { path: 'listTransporte', component: ListadoTransporteComponent },  
    { path: 'listChofer', component: ListadoChoferComponent },
    { path: 'agregarChofer', component: AgregarEditarChoferComponent },
    { path: 'editarChofer/:id', component: AgregarEditarChoferComponent },
    { path: 'listVehiculo', component: ListadoCamionComponent },
    { path: 'agregarVehiculo', component: AgregarEditarCamionComponent },
    { path: 'editarVehiculo/:id', component: AgregarEditarCamionComponent },
    { path: 'listOrdenDeCarga', component: ListadoOrdenDeCargaComponent }, 
    { path: 'agregarOrdenDeCarga', component: AgregarEditarOrdenDeCargaComponent },
    { path: 'editarOrdenDeCarga/:id', component: AgregarEditarOrdenDeCargaComponent },
    { path: 'listCliente', component: ListadoClienteComponent },
    { path: 'agregarCliente', component: AgregarEditarClienteComponent },
    { path: 'editarCliente/:id', component: AgregarEditarClienteComponent },
    { path: 'listOrdenDeGasoil', component: ListadoOrdenDeGasoilComponent},
    { path: 'agregarOrdenGasoil', component: AgregarOrdenDeGasoilComponent },
    { path: 'editarOrdenGasoil/:id', component: AgregarOrdenDeGasoilComponent },
    { path: 'agregarDestinoDeCarga', component: AgregarEditarDestinoDeCargaComponent },
    { path: 'editarDestinoDeCarga/:id', component: AgregarEditarDestinoDeCargaComponent },
    { path: 'listDestinoDeCarga', component: ListadoDestinoDeCargaComponent },
    { path: 'agregarDestinoDeDescarga', component: AgregarEditarDestinoDeDescargaComponent },
    { path: 'editarDestinoDeDescarga/:id', component: AgregarEditarDestinoDeDescargaComponent },
    { path: 'listDestinoDeDescarga', component: ListadoDestinoDeDescargaComponent }  
] },
{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
