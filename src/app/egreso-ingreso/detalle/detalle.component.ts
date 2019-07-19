import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';

import { EgresoIngreso } from '../EgresoIngreso.model';
import { EgresoIngresoService } from '../egreso-ingreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: EgresoIngreso[] = [];
  itemsSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private eiService: EgresoIngresoService
  ) { }

  ngOnInit(): void {
    this.itemsSubscription = this.store.select('ei')
      .subscribe(egresoIngreso => this.items = egresoIngreso.items);
  }

  public deleteItem(item: EgresoIngreso): void {
    this.eiService.deleteItem(item);
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

}
