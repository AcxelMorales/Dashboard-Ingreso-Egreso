import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { APP_REDUCERS } from './app.reducer';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

// Charts
import { ChartsModule } from 'ng2-charts';

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
import { EgresoIngresoPipe } from './egreso-ingreso/egreso-ingreso.pipe';

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
    NavComponent,
    EgresoIngresoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ChartsModule,
    StoreModule.forRoot(APP_REDUCERS),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
