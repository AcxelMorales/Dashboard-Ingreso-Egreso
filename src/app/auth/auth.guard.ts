import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad  {

  constructor(
    private _authService: AuthService
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.isAuth();
  }
    
  canLoad(): Observable<boolean> {
    return this._authService.isAuth().pipe(take(1)); // Take solo permite una subscripción
  }

}
