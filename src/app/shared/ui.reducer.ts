import * as ui from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer(state = initState, action: ui.actions): State {
    switch (action.type) {
        case ui.ACTIVATE_LOADING:
            return { isLoading: true }
        case ui.DEACTIVATE_LOADING:
            return { isLoading: false }
        default: return state;
    }
}