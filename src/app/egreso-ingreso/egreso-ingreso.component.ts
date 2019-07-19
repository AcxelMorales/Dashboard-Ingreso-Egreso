import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { Subscription } from 'rxjs';

import { EgresoIngreso } from './EgresoIngreso.model';
import { EgresoIngresoService } from './egreso-ingreso.service';

@Component({
  selector: 'app-egreso-ingreso',
  templateUrl: './egreso-ingreso.component.html',
  styles: []
})
export class EgresoIngresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  tipo: string = 'Ingreso';
  cargando: boolean;
  eiSubscription: Subscription = new Subscription();

  constructor(
    private _egresoIngresoService: EgresoIngresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, [Validators.required, Validators.min(1)]),
    });

    this.eiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  public createIngresoEgreso(): void {
    const egresoIngreso: EgresoIngreso = new EgresoIngreso(
      {
        ...this.form.value, // Creamos el objeto con los valores de la forma
        tipo: this.tipo     // unimos el tipo con la propiedad de la clase
      }
    );
    
    this._egresoIngresoService.createEgresoIngreso(egresoIngreso);
    this.form.reset({
      monto: 0
    });
  }

  ngOnDestroy(): void {
    this.eiSubscription.unsubscribe();
  }

}
