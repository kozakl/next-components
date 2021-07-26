import {ReactNode} from 'react';

export interface Toast {
    id:number;
    body:ReactNode;
    autoClose?:boolean
}
