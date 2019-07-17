import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-regitry',
  templateUrl: './regitry.component.html',
  styles: []
})
export class RegistryComponent implements OnInit, OnDestroy {

  cargando: boolean;
  uiSubscription: Subscription;

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }
  constructor(
    private _authService: AuthService,
    private store: Store<AppState>
  ) { }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this._authService.createUser(form.controls.nombre.value, form.controls.correo.value, form.controls.password.value);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}

