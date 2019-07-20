import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Modulos Personalizados
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// Components
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EgresoIngresoComponent } from './egreso-ingreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

// Pipe
import { EgresoIngresoPipe } from './egreso-ingreso.pipe';

// NGRX
import { StoreModule } from '@ngrx/store';
import { eiReducer } from './egreso-ingreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    EgresoIngresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    EgresoIngresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ei', eiReducer)
  ]
})
export class EgresoIngresoModule { }
