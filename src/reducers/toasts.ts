import {DeleteToast, ShowToast} from '../actions';
import {Toast} from '../types';
import * as actions from '../actions';

const defaultState:Toast[] = [];

export function toasts(state = defaultState,
                       action:ShowToast | DeleteToast)
{
    switch (action.type)
    {
        case actions.SHOW_TOAST :
            return [
                ...state,
                action.toast
            ];
        
        case actions.DELETE_TOAST :
            return [
                ...state.filter(toast => toast.id != action.id)
            ];
        
        default :
            return state;
    }
}
