import {FunctionComponent} from 'react';
import {classNames} from '@kozakl/utils';
import {withModal} from '../modal';
import {Spinner} from '../spinner';
import style from './SpinnerModal.module.css';

const SpinnerModal:FunctionComponent<Props> = (props)=>
{
    return (
        <Spinner
            className={classNames(
                style.spinner,
                props.active && style.show
            )}
            background={'var(--background-secondary)'}/>
    )
};

interface Props {
    active?:boolean;
}

export default withModal(SpinnerModal, {
    outTime: 250,
    transparent: true
});
