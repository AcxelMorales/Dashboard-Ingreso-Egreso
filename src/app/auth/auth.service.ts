// Core
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

// Actions
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';

// SweetAlert
import Swal from 'sweetalert2';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// RXJS
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import User from './User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener(): void {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((userObj: any) => {
          const newUser = new User(userObj);
          this.store.dispatch(new SetUserAction(newUser));

          this.user = newUser;
        });
      } else {
        this.userSubscription.unsubscribe();
        this.user = null;
      }
    });
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) this.router.navigate(['/login']);
          return fbUser !== null
        })
      );
  }

  createUser(nombre: string, correo: string, password: string): void {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(correo, password)
      .then(userFb => {
        const user: User = {
          uid: userFb.user.uid,
          nombre: nombre,
          correo: userFb.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`).set(user)
          .then(() => {
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Usuario creado',
              showConfirmButton: false,
              timer: 1500
            });

            this.router.navigate(['/']);

            this.store.dispatch(new DeactivateLoadingAction());
          });
      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());

        Swal.fire({
          type: 'error',
          title: 'Error al registrarse',
          text: err.message
        });
      });
  }

  login(correo: string, password: string): void {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(correo, password)
      .then(resp => {
        this.router.navigate(['/']);

        this.store.dispatch(new DeactivateLoadingAction());
      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());

        Swal.fire({
          type: 'error',
          title: 'Error en el Login',
          text: err.message
        });
      });
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch(new UnsetUserAction());
  }

  getUser(): User {
    return { ...this.user }; // Rompemos la referencia
  }

}
