import {FunctionComponent, MouseEvent} from 'react';
import {classNames} from '@kozakl/utils';
import React from 'react';
import style from './Button.module.css';

const Button:FunctionComponent<Props> = (props)=>
{
    const buttonClass = classNames(
        style.button,
        props.className
    );
    return (
        <button
            className={buttonClass}
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
};

interface Props {
    className?:string;
    type?:'submit' | 'reset' | 'button';
    disabled?:boolean;
    onClick?:(event:MouseEvent<HTMLButtonElement>)=> void;
}

export default Button;
