import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/egreso-ingreso/egreso-ingreso.reducer';

import { Subscription } from 'rxjs';

import { Label, MultiDataSet } from 'ng2-charts';

import { EgresoIngreso } from '../EgresoIngreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;
  countIngresos: number;
  countEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos', 'Diferencia'];
  public doughnutChartData: MultiDataSet = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ei').subscribe(ei => this.countIngresoEgreso(ei.items));
  }

  countIngresoEgreso(items: EgresoIngreso[]): void {
    this.ingresos = 0;
    this.egresos = 0;
    this.countIngresos = 0;
    this.countEgresos = 0;

    items.forEach(i => {
      if (i.tipo === 'Ingreso') {
        this.countIngresos++;
        this.ingresos += i.monto;
      } else {
        this.countEgresos++;
        this.egresos += i.monto;
      }
    });

    this.doughnutChartData = [[this.ingresos, this.egresos, (this.ingresos - this.egresos)]];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
