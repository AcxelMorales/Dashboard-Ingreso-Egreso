import { Routes } from "@angular/router";

import { EstadisticaComponent } from '../egreso-ingreso/estadistica/estadistica.component';
import { EgresoIngresoComponent } from '../egreso-ingreso/egreso-ingreso.component';
import { DetalleComponent } from '../egreso-ingreso/detalle/detalle.component';

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: EgresoIngresoComponent },
    { path: 'detalle', component: DetalleComponent },
];