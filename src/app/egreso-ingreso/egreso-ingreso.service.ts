import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { EgresoIngreso } from './EgresoIngreso.model';
import { AuthService } from '../auth/auth.service';

import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetItemsAction, UnsetItemsAction } from './egreso-ingreso.actions';

import Swal from 'sweetalert2';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import User from '../auth/User.model';

@Injectable({
  providedIn: 'root'
})
export class EgresoIngresoService {

  egresoIngresoListenerSubscription: Subscription = new Subscription();
  egresoIngresoItemsSubscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private _authService: AuthService,
    private store: Store<AppState>
  ) { }

  initEgresoIngresoListener(): void {
    this.egresoIngresoListenerSubscription = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(auth => this.EgresoIngresoItems(auth.user.uid));
  }

  private EgresoIngresoItems(uid: string): void {
    this.egresoIngresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((collection: any[]) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  endSubscriptions(): void {
    this.egresoIngresoListenerSubscription.unsubscribe();
    this.egresoIngresoItemsSubscription.unsubscribe();

    this.store.dispatch(new UnsetItemsAction());
  }

  createEgresoIngreso(egresoIngreso: EgresoIngreso): void {
    this.store.dispatch(new ActivateLoadingAction());

    const user: User = this._authService.getUser();
    this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items').add({ ...egresoIngreso })
      .then(() => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: `${egresoIngreso.tipo} creado`,
          showConfirmButton: false,
          timer: 1500
        });

        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());

        Swal.fire({
          type: 'error',
          title: `Error al crear un ${egresoIngreso.tipo}`,
          text: err.message
        });
      });
  }

  deleteItem(item: EgresoIngreso): Promise<void> {
    const user: User = this._authService.getUser();

    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${item.uid}`).delete()
      .then(() => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: `${item.descripcion} eliminado correctamente`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}
