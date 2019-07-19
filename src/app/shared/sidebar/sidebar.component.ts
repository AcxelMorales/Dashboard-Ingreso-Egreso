import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { EgresoIngresoService } from 'src/app/egreso-ingreso/egreso-ingreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  name: string;
  email: string;

  subscription: Subscription = new Subscription();

  constructor(
    private _authService: AuthService,
    private _eiService: EgresoIngresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(auth => {
      this.name  = auth.user.nombre;
      this.email = auth.user.correo;
    });
  }

  public logout(): void {
    this._authService.logout();
    this._eiService.endSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
