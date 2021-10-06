import {ChangeEventHandler,
        FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import style from './Radio.module.css';

const Radio:FunctionComponent<Props> = (props)=>
{
    const radioClass = classNames(
        style.radio,
        props.className
    );
    const labelClass = classNames(
        style.label,
        props.disabled && style.disabled
    );
    return (
        <div className={radioClass}>
            <label className={labelClass}>
                <input
                    className={style.input}
                    id={props.id}
                    type="radio"
                    value={props.children.toString()}
                    name={props.name}
                    checked={props.checked}
                    defaultChecked={props.defaultChecked}
                    disabled={props.disabled}
                    onChange={props.onChange}/>
                <span className={style.circle}/>
                <span>{props.children}</span>
            </label>
        </div>
    );
};

interface Props {
    className?:string;
    id?:string;
    name?:string;
    checked?:boolean;
    defaultChecked?:boolean;
    disabled?:boolean;
    onChange?:ChangeEventHandler<HTMLInputElement>;
}

export default Radio;
