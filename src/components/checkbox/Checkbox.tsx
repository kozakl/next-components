import {ChangeEventHandler,
        FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import React from 'react';
import style from './Checkbox.module.css';

const Checkbox:FunctionComponent<Props> = (props)=>
{
    const checkboxClass = classNames(
        style.checkbox,
        props.className
    );
    const labelClass = classNames(
        style.label,
        props.disabled && style.disabled
    );
    return (
        <div className={checkboxClass}>
            <label className={labelClass}>
                <input
                    className={style.input}
                    id={props.id}
                    type="checkbox"
                    checked={props.checked}
                    disabled={props.disabled}
                    onChange={props.onChange}/>
                <span className={style.box}/>
                <span>{props.children}</span>
            </label>
            {props.error &&
                <div className={style.error}>
                    {props.error}
                </div>}
        </div>
    );
};

interface Props {
    className?:string;
    id?:string;
    checked?:boolean;
    disabled?:boolean;
    error?:string;
    onChange?:ChangeEventHandler<HTMLInputElement>;
}

export default Checkbox;
