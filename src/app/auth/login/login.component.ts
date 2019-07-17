import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  uiSubscription: Subscription;
  
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  constructor(
    private _authService: AuthService,
    private store: Store<AppState>
  ) { }

  public login(form: NgForm): void {
    this._authService.login(form.controls.correo.value, form.controls.password.value);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
