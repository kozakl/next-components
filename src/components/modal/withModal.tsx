import {FunctionComponent} from 'react';
import Modal from './Modal';

export function withModal<P>(Component:FunctionComponent<P>)
{
    return (props:P & ModalProps)=>{
        return (
            <Modal {...props}>
                <Component {...props}/>
            </Modal>
        );
    }
}

interface ModalProps {
    visible:boolean;
    outTime?:number;
    interactive?:boolean;
    center?:boolean;
    onClose?:()=> void;
}
