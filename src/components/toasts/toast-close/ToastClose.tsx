import {FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import React from 'react';
import style from './ToastClose.module.css';

const ToastClose:FunctionComponent<Props> = (props)=>
{
    const toastCloseClass = classNames(
        style.toastClose
    );
    return (
        <a
            className={toastCloseClass}
            onClick={props.onClick}/>
    );
};

interface Props {
    onClick?:()=> void;
}

export default ToastClose;
