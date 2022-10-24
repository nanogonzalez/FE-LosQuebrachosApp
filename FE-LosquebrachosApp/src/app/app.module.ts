import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarEditarTransporteComponent } from './components/agregar-editar-transporte/agregar-editar-transporte.component';
import { VerTransporteComponent } from './components/ver-transporte/ver-transporte.component';
import { ListadoTransporteComponent } from './components/listado-transporte/listado-transporte.component';
import { AgregarEditarChoferComponent } from './components/agregar-editar-chofer/agregar-editar-chofer.component';
import { VerChoferComponent } from './components/ver-chofer/ver-chofer.component';
import { ListadoChoferComponent } from './components/listado-chofer/listado-chofer.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { ListadoCamionComponent } from './components/listado-camion/listado-camion.component';
import { VerCamionComponent } from './components/ver-camion/ver-camion.component';
import { AgregarEditarCamionComponent } from './components/agregar-editar-camion/agregar-editar-camion.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarTransporteComponent,
    VerTransporteComponent,
    ListadoTransporteComponent,
    AgregarEditarChoferComponent,
    VerChoferComponent,
    ListadoChoferComponent,
    MenuComponent,
    ListadoCamionComponent,
    VerCamionComponent,
    AgregarEditarCamionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
