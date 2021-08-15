import {FunctionComponent, MouseEvent,
        useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {classNames} from '@kozakl/utils';
import {deleteToast, DeleteToast} from '../../../actions';
import {StoreState, Toast} from '../../../types';
import style from './ToastItem.module.css';

const ToastItem:FunctionComponent<Props> = (props)=>
{
    const [show, setShow] = useState(false);
    
    useEffect(()=> {
        setTimeout(()=>
            setShow(true), 10);
        
        if (props.autoClose) {
            const timer = setTimeout(()=> {
                setShow(false);
                setTimeout(()=>
                    props.deleteToast(props.id), 400)
            }, 2500);
            return ()=>
                clearTimeout(timer);
        }
    }, []);
    
    function onClick(event:MouseEvent) {
        if (event.target instanceof HTMLButtonElement ||
            event.target instanceof HTMLAnchorElement) {
            setShow(false);
            setTimeout(()=>
                props.deleteToast(props.id), 400);
        }
    }
    
    const toastClass = classNames(
        style.toast,
        props.className,
        show && style.show
    );
    return (
        <div
            className={toastClass}
            key={props.id}
            onClick={onClick}>
            {props.body}
        </div>
    );
};

interface Props extends Toast {
    className?:string;
    autoClose?:boolean;
    deleteToast:(id:number)=> DeleteToast;
}

function mapDispatchToProps(
    dispatch:ThunkDispatch<StoreState, void,
        DeleteToast>) {
    return {
        deleteToast: (id:number)=>
            dispatch(deleteToast(id))
    };
}

export default connect(null, mapDispatchToProps)(ToastItem);
