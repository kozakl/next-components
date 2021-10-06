import {FunctionComponent, ReactNode} from 'react';
import {classNames} from '@kozakl/utils';
import {Button} from '../button';
import {withModal} from '../modal';
import style from './Dialog.module.css';

const Dialog:FunctionComponent<Props> = (props)=>
{
    const dialogClass = classNames(
        style.dialog,
        props.className
    );
    return (
        <div className={dialogClass}>
            <h3 className={style.title}>
                {props.title}
            </h3>
            <div className={style.message}>
                {props.children}
            </div>
            <div className={style.actions}>
                {props.onDismiss &&
                    <Button
                        size="small"
                        onClick={props.onDismiss}>
                        {props.dismiss}
                    </Button>}
                {props.onConfirm &&
                    <Button
                        size="small"
                        onClick={props.onConfirm}>
                        {props.confirm}
                    </Button>}
            </div>
        </div>
    );
};

Dialog.defaultProps = {
    confirm: 'OK',
    dismiss: 'Cancel'
};

interface Props {
    className?:string;
    visible:boolean;
    title:string;
    children?:ReactNode;
    confirm?:string;
    dismiss?:string;
    onConfirm?:()=> void;
    onDismiss?:()=> void;
}

export default withModal(Dialog);
