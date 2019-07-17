import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import User from './User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router
  ) { }

  initAuthListener(): void {
    this.afAuth.authState.subscribe();
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
          });
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Error al registrarse',
          text: err.message
        });
      });
  }

  login(correo: string, password: string): void {
    this.afAuth.auth.signInWithEmailAndPassword(correo, password)
      .then(resp => {
        this.router.navigate(['/']);
      })
      .catch(err => {
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
  }

}
