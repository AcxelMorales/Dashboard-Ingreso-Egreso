import * as auth from './auth.actions';

import User from './User.model';

export interface AuthState {
    user: User;
}

const initState: AuthState = {
    user: null
};

export function authReducer(state: AuthState = initState, action: auth.actions): AuthState {
    switch (action.type) {
        case auth.SET_USER:
            return {
                user: { ...action.user } // Tomamos cada una de las propiedades, y hacemos los pares y valores
            }
        case auth.UNSET_USER:
            return {
                user: null
            }
        default: return state;
    }
}