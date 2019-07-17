import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-regitry',
  templateUrl: './regitry.component.html',
  styles: []
})
export class RegistryComponent {

  constructor(
    private _authService: AuthService
  ) { }

  public onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this._authService.createUser(form.controls.nombre.value, form.controls.correo.value, form.controls.password.value);
  }

}

