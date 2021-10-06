import {FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import style from './Toggle.module.css';

const Toggle:FunctionComponent<Props> = (props)=>
{
    const toggleClass = classNames(
        style.toggle,
        props.className,
        props.cross && style.cross
    );
    return (
        <svg
            className={toggleClass}
            viewBox="0 0 100 100"
            onClick={props.onChange}>
            <path className={style.line1} d="M5 35h90v5H5z"/>
            <path className={style.line3} d="M5 70h90v5H5z"/>
        </svg>
    );
};

interface Props {
    className?:string;
    cross:boolean;
    onChange?:()=> void;
}

export default Toggle;
