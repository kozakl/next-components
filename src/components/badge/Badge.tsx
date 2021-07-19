import {FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import React from 'react';
import style from './Badge.module.css';

const Badge:FunctionComponent<Props> = (props)=>
{
    const badgeClass = classNames(
        style.badge,
        props.className,
    );
    return (
        <div
            className={badgeClass}>
            <label className={style.label}>
                {props.children}
            </label>
        </div>
    );
};

interface Props {
    className?:string;
}

export default Badge;
