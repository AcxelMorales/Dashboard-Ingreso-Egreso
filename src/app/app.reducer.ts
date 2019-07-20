import { ActionReducerMap } from '@ngrx/store';

import { State, uiReducer } from './shared/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
// import { EIState, eiReducer } from './egreso-ingreso/egreso-ingreso.reducer';

export interface AppState {
    ui: State;
    auth: AuthState,
    // ei: EIState
}

export const APP_REDUCERS: ActionReducerMap<AppState>  = {
    ui: uiReducer,
    auth: authReducer,
    // ei: eiReducer
};
