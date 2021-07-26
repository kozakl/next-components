import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {ToastItem} from './toast-item';
import {deleteToast, DeleteToast} from '../../actions';
import {StoreState, Toast} from '../../types';
import React from 'react';
import style from './Toasts.module.css';

export const Toasts:FunctionComponent<Props> = (props)=>
{
    return (
        <div className={style.toasts}>
            {props.toasts.map((toast)=>
                <ToastItem
                    className={style.toast}
                    key={toast.id}
                    {...toast}/>)}
        </div>
    );
};

interface Props {
    toasts:Toast[];
}

function mapDispatchToProps(
    dispatch:ThunkDispatch<StoreState, void,
        DeleteToast>) {
    return {
        deleteToast: (id:number)=>
            dispatch(deleteToast(id))
    };
}

export default connect(null, mapDispatchToProps)(Toasts);
