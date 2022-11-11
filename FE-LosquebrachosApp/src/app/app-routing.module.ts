import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarCamionComponent } from './components/agregar-editar-camion/agregar-editar-camion.component';
import { AgregarEditarChoferComponent } from './components/agregar-editar-chofer/agregar-editar-chofer.component';
import { AgregarEditarOrdenDeCargaComponent } from './components/agregar-editar-orden-de-carga/agregar-editar-orden-de-carga.component';
import { AgregarEditarTransporteComponent } from './components/agregar-editar-transporte/agregar-editar-transporte.component';

import { ListadoCamionComponent } from './components/listado-camion/listado-camion.component';
import { ListadoChoferComponent } from './components/listado-chofer/listado-chofer.component';

import { ListadoOrdenDeCargaComponent } from './components/listado-orden-de-carga/listado-orden-de-carga.component';
import { ListadoTransporteComponent } from './components/listado-transporte/listado-transporte.component';
import { LoginComponent } from './components/login/login.component';

import { VerCamionComponent } from './components/ver-camion/ver-camion.component';
import { VerChoferComponent } from './components/ver-chofer/ver-chofer.component';
import { VerTransporteComponent } from './components/ver-transporte/ver-transporte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [

{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'menuLosQuebrachos', component: MenuComponent },
{ path: 'listTransporte', component: ListadoTransporteComponent },
{ path: 'agregarTransporte', component: AgregarEditarTransporteComponent },
{ path: 'verTransporte/:id', component: VerTransporteComponent },
{ path: 'editarTransporte/:id', component: AgregarEditarTransporteComponent },
{ path: 'listChofer', component: ListadoChoferComponent },
{ path: 'agregarChofer', component: AgregarEditarChoferComponent },
{ path: 'verChofer/:id', component: VerChoferComponent },
{ path: 'editarChofer/:id', component: AgregarEditarChoferComponent },
{ path: 'listVehiculo', component: ListadoCamionComponent },
{ path: 'agregarVehiculo', component: AgregarEditarCamionComponent },
{ path: 'verVehiculo/:id', component: VerCamionComponent },
{ path: 'editarVehiculo/:id', component: AgregarEditarCamionComponent },
{ path: 'agregarOrdenDeCarga', component: AgregarEditarOrdenDeCargaComponent },
{ path: 'listOrdenDeCarga', component: ListadoOrdenDeCargaComponent },
{ path: 'editarOrdenDeCarga/:id', component: AgregarEditarOrdenDeCargaComponent },
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
