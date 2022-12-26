import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarCamionComponent } from './components/agregar-editar-camion/agregar-editar-camion.component';
import { AgregarEditarChoferComponent } from './components/agregar-editar-chofer/agregar-editar-chofer.component';
import { AgregarEditarClienteComponent } from './components/agregar-editar-cliente/agregar-editar-cliente.component';
import { AgregarEditarOrdenDeCargaComponent } from './components/agregar-editar-orden-de-carga/agregar-editar-orden-de-carga.component';
import { AgregarEditarTransporteComponent } from './components/agregar-editar-transporte/agregar-editar-transporte.component';
import { AgregarOrdenDeGasoilComponent } from './components/agregar-orden-de-gasoil/agregar-orden-de-gasoil.component';
import { ListadoCamionComponent } from './components/listado-camion/listado-camion.component';
import { ListadoChoferComponent } from './components/listado-chofer/listado-chofer.component';
import { ListadoClienteComponent } from './components/listado-cliente/listado-cliente.component';
import { ListadoOrdenDeCargaComponent } from './components/listado-orden-de-carga/listado-orden-de-carga.component';
import { ListadoOrdenDeGasoilComponent } from './components/listado-orden-de-gasoil/listado-orden-de-gasoil.component';
import { ListadoTransporteComponent } from './components/listado-transporte/listado-transporte.component';
import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { OrdenDeCargaComponent } from './components/orden-de-carga/orden-de-carga.component';
import { VerCamionComponent } from './components/ver-camion/ver-camion.component';
import { VerChoferComponent } from './components/ver-chofer/ver-chofer.component';
import { VerTransporteComponent } from './components/ver-transporte/ver-transporte.component';



const routes: Routes = [

{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'mainMenu', component: MainMenuComponent },
{ path: '', component: MainMenuComponent, 
children: [
    { path: 'agregarTransporte', component: AgregarEditarTransporteComponent },
    { path: 'verTransporte/:id', component: VerTransporteComponent },
    { path: 'editarTransporte/:id', component: AgregarEditarTransporteComponent },
    { path: 'listTransporte', component: ListadoTransporteComponent },  
    { path: 'listChofer', component: ListadoChoferComponent },
    { path: 'agregarChofer', component: AgregarEditarChoferComponent },
    { path: 'verChofer/:id', component: VerChoferComponent },
    { path: 'editarChofer/:id', component: AgregarEditarChoferComponent },
    { path: 'listVehiculo', component: ListadoCamionComponent },
    { path: 'agregarVehiculo', component: AgregarEditarCamionComponent },
    { path: 'verVehiculo/:id', component: VerCamionComponent },
    { path: 'editarVehiculo/:id', component: AgregarEditarCamionComponent },
    { path: 'listOrdenDeCarga', component: ListadoOrdenDeCargaComponent }, 
    { path: 'ordenDeCarga', component: OrdenDeCargaComponent },
    { path: 'editarOrdenDeCarga/:id', component: AgregarEditarOrdenDeCargaComponent },
    { path: 'listCliente', component: ListadoClienteComponent },
    { path: 'agregarCliente', component: AgregarEditarClienteComponent },
    { path: 'editarCliente/:id', component: AgregarEditarClienteComponent },
    { path: 'listOrdenDeGasoil', component: ListadoOrdenDeGasoilComponent},
    { path: 'agregarOrdenGasoil', component: AgregarOrdenDeGasoilComponent },
    { path: 'editarOrdenGasoil/:id', component: AgregarOrdenDeGasoilComponent } 
] },
{ path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
