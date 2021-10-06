import {FunctionComponent} from 'react';
import {default as Modal} from './Modal';

export function withModal<P>(
    Component:FunctionComponent<P>,
    modalProps?:Partial<ModalProps>) {
    return (props:P & ModalProps)=>{
        return (
            <Modal {...modalProps} {...props}>
                <Component {...props}/>
            </Modal>
        );
    }
}

interface ModalProps {
    visible:boolean;
    outTime?:number;
    transparent?:boolean;
    interactive?:boolean;
    center?:boolean;
    autoOverflow?:boolean;
    onClose?:()=> void;
}
