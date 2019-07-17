import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistryComponent } from './auth/registry/registry.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EgresoIngresoComponent } from './egreso-ingreso/egreso-ingreso.component';
import { EstadisticaComponent } from './egreso-ingreso/estadistica/estadistica.component';
import { DetalleComponent } from './egreso-ingreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavComponent } from './shared/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    DashboardComponent,
    EgresoIngresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    SidebarComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
