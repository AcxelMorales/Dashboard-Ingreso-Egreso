import { Action } from '@ngrx/store';

import { EgresoIngreso } from './EgresoIngreso.model';

export const SET_ITEMS = '[Egreso-Ingreso] Set Items';
export const UNSET_ITEMS = '[Egreso-Ingreso] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: EgresoIngreso[]) { }
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsAction | UnsetItemsAction;