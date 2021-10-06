import {FunctionComponent, MouseEvent} from 'react';
import {classNames} from '@kozakl/utils';
import style from './Button.module.css';

const Button:FunctionComponent<Props> = (props)=>
{
    const buttonClass = classNames(
        style.button,
        props.size === 'small' &&
            style.small,
        props.className
    );
    return (
        <button
            className={buttonClass}
            id={props.id}
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
    id?:string;
    type?:'submit' | 'reset' | 'button';
    size?:'normal' | 'small';
    disabled?:boolean;
    onClick?:(event:MouseEvent<HTMLButtonElement>)=> void;
}

export default Button;
