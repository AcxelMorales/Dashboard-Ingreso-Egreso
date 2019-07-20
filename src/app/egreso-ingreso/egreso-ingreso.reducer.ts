import * as ei from './egreso-ingreso.actions';

import { EgresoIngreso } from './EgresoIngreso.model';

import { AppState } from '../app.reducer';

export interface EIState {
    items: EgresoIngreso[];
}

export interface AppState extends AppState {
    ei: EIState;
}

const initState: EIState = {
    items: []
};

export function eiReducer(state: EIState = initState, action: ei.actions): EIState {
    switch (action.type) {
        case ei.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(i => { // Barremos cada uno de las llaves del obj
                        return {
                            ...i // Remplazamos cada valor
                        }
                    })
                ]
            };
        case ei.UNSET_ITEMS:
            return {
                items: []
            };
        default: return state;
    }
}
