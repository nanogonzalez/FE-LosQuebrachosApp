import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarEditarTransporteComponent } from './components/agregar-editar-transporte/agregar-editar-transporte.component';
import { ListadoTransporteComponent } from './components/listado-transporte/listado-transporte.component';
import { AgregarEditarChoferComponent } from './components/agregar-editar-chofer/agregar-editar-chofer.component';
import { ListadoChoferComponent } from './components/listado-chofer/listado-chofer.component';
import { SharedModule } from './shared/shared.module';
import { ListadoCamionComponent } from './components/listado-camion/listado-camion.component';
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
import { AgregarOrdenDeGasoilComponent } from './components/agregar-orden-de-gasoil/agregar-orden-de-gasoil.component';
import { ListadoOrdenDeGasoilComponent } from './components/listado-orden-de-gasoil/listado-orden-de-gasoil.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { AgregarEditarDestinoDeCargaComponent } from './components/agregar-editar-destino-de-carga/agregar-editar-destino-de-carga.component';
import { ListadoDestinoDeCargaComponent } from './components/listado-destino-de-carga/listado-destino-de-carga.component';
import { ListadoDestinoDeDescargaComponent } from './components/listado-destino-de-descarga/listado-destino-de-descarga.component';
import { AgregarEditarDestinoDeDescargaComponent } from './components/agregar-editar-destino-de-descarga/agregar-editar-destino-de-descarga.component';
import { SingupComponent } from './components/singup/singup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { ResetComponent } from './components/reset/reset.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';




@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarTransporteComponent,
    ListadoTransporteComponent,
    AgregarEditarChoferComponent,
    ListadoChoferComponent,
    ListadoCamionComponent,
    AgregarEditarCamionComponent,
    MatConfirmBoxComponent,
    ListadoOrdenDeCargaComponent,
    AgregarEditarOrdenDeCargaComponent,
    LoginComponent,
    AgregarEditarClienteComponent,
    ListadoClienteComponent,
    AgregarOrdenDeGasoilComponent,
    ListadoOrdenDeGasoilComponent,
    MainMenuComponent,
    AgregarEditarDestinoDeCargaComponent,
    ListadoDestinoDeCargaComponent,
    ListadoDestinoDeDescargaComponent,
    AgregarEditarDestinoDeDescargaComponent,
    SingupComponent,
    ForgotPassComponent,
    ResetComponent,
    WelcomePageComponent
  
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
 
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ListadoTransporteComponent, MatConfirmBoxComponent]
})

export class AppModule { }
