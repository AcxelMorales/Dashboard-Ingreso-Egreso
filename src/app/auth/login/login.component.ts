import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(
    private _authService: AuthService
  ) { }

  public login(form: NgForm): void {
    this._authService.login(form.controls.correo.value, form.controls.password.value);
  }

}
