import {FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import style from './Spinner.module.css';

const Spinner:FunctionComponent<Props> = (props)=>
{
    const spinnerClass = classNames(
        style.spinner,
        props.className
    );
    const wrapperClass = classNames(
        style.wrapper,
        props.background && style.background,
    );
    return (
        <div
            className={spinnerClass}
            style={{width: props.size}}>
            <div
                className={wrapperClass}
                style={{background: props.background}}>
                <svg className={style.svg} viewBox="0 0 60 60">
                    <circle
                        className={style.circle}
                        stroke={props.color}
                        cx="30"
                        cy="30"
                        r="25"/>
                </svg>
            </div>
        </div>
    );
};

Spinner.defaultProps = {
    color: '#BDBDBD',
    size: '3.75em'
};

interface Props {
    className?:string;
    background?:string;
    color?:string;
    size?:string;
}

export default Spinner;
