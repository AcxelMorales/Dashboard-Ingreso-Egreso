import { ActionReducerMap } from '@ngrx/store';

import { State, uiReducer } from './shared/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';

export interface AppState {
    ui: State;
    auth: AuthState
}

export const APP_REDUCERS: ActionReducerMap<AppState>  = {
    ui: uiReducer,
    auth: authReducer
};
