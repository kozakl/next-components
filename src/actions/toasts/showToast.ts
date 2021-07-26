import {ReactNode} from 'react';
import {Toast} from '../../types';

export const SHOW_TOAST = 'showToast';

let id = 0;

export function showToast(body:ReactNode, autoClose?:boolean):ShowToast {
    return {
        type: SHOW_TOAST,
        toast: {
            id: id++,
            body,
            autoClose
        }
    }
}

export interface ShowToast {
    type:typeof SHOW_TOAST;
    toast:Toast;
}
