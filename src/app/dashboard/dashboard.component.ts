import { Component, OnInit } from '@angular/core';

import { EgresoIngresoService } from '../egreso-ingreso/egreso-ingreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {


  constructor(
    private _eiService: EgresoIngresoService
  ) { }

  ngOnInit(): void {
    this._eiService.initEgresoIngresoListener();
  }
}
