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
import { SharedModule } from './shared/shared.module';
import { ListadoCamionComponent } from './components/listado-camion/listado-camion.component';
import { VerCamionComponent } from './components/ver-camion/ver-camion.component';
import { AgregarEditarCamionComponent } from './components/agregar-editar-camion/agregar-editar-camion.component';
import { MatConfirmBoxComponent } from './mat-confirm-box/mat-confirm-box.component';
import { ListadoOrdenDeCargaComponent } from './components/listado-orden-de-carga/listado-orden-de-carga.component';
import { AgregarEditarOrdenDeCargaComponent } from './components/agregar-editar-orden-de-carga/agregar-editar-orden-de-carga.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './components/login/login.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { AgregarEditarClienteComponent } from './components/agregar-editar-cliente/agregar-editar-cliente.component';
import { ListadoClienteComponent } from './components/listado-cliente/listado-cliente.component';
import { PlaceAutocompleteComponent } from './components/place-autocomplete/place-autocomplete.component';
import { PlaceCardComponent } from './components/place-card/place-card.component';
import { MapDisplayComponent } from './components/map-display/map-display.component';
import { OrdenDeCargaComponent } from './components/orden-de-carga/orden-de-carga.component';
import { AgregarOrdenDeGasoilComponent } from './components/agregar-orden-de-gasoil/agregar-orden-de-gasoil.component';
import { ListadoOrdenDeGasoilComponent } from './components/listado-orden-de-gasoil/listado-orden-de-gasoil.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarTransporteComponent,
    VerTransporteComponent,
    ListadoTransporteComponent,
    AgregarEditarChoferComponent,
    VerChoferComponent,
    ListadoChoferComponent,
    ListadoCamionComponent,
    VerCamionComponent,
    AgregarEditarCamionComponent,
    MatConfirmBoxComponent,
    ListadoOrdenDeCargaComponent,
    AgregarEditarOrdenDeCargaComponent,
    LoginComponent,
    AgregarEditarClienteComponent,
    ListadoClienteComponent,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapDisplayComponent,
    OrdenDeCargaComponent,
    AgregarOrdenDeGasoilComponent,
    ListadoOrdenDeGasoilComponent,
    MainMenuComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule.forRoot({
      domain: 'dev-j7gw3civxd4qubdc.us.auth0.com',
      clientId: 'r1NtsuKFZ5kzlDE1wJ7cS4XPorx90Aa3'
    }),
    GoogleMapsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
 
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ListadoTransporteComponent, MatConfirmBoxComponent]
})

export class AppModule { }
