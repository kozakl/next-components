import {Children, FunctionComponent,
        ReactElement, useEffect,
        useRef, useState} from 'react';
import {classNames} from '@kozakl/utils';
import React from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';

const Modal:FunctionComponent<Props> = (props)=>
{
    const root = useRef<HTMLDivElement>(),
          container = useRef<HTMLDivElement>();
    const [visible, setVisible] = useState(false),
          [active, setActive] = useState(false),
          [visibleDelay, setVisibleDelay] = useState(0),
          [activeDelay, setActiveDelay] = useState(0);
    
    useEffect(()=> {
        root.current = document.querySelector('#modal-root');
        container.current = document.createElement('div');
        container.current.addEventListener('click', onClickModal);
        
        return ()=> {
            clearTimeout(visibleDelay);
            clearTimeout(activeDelay);
            container.current.removeEventListener('click', onClickModal);
        }
    }, []);
    
    useEffect(()=> {
        if (props.visible) {
            setVisible(true);
        } else {
            setActive(false);
        }
        if (!visible && props.visible) {
            clearTimeout(visibleDelay);
            clearTimeout(activeDelay);
            
            root.current.appendChild(container.current);
            document.body.style.overflowY = 'hidden';
            setActiveDelay(window.setTimeout(()=>
                setActive(true), 20));
        } else if (visible && !props.visible) {
            clearTimeout(visibleDelay);
            clearTimeout(activeDelay);
            
            setVisibleDelay(window.setTimeout(()=> {
                setVisible(false);
                root.current.removeChild(container.current);
                document.body.style.overflowY = 'unset';
            }, props.outTime));
        }
    }, [props.visible]);
    
    function onClickModal(event:MouseEvent) {
        if (event.target === event.currentTarget) {
            if (props.onClose) {
                props.onClose();
            }
        }
    }
    
    container.current &&
        (container.current.className = classNames(
            style.modal,
            active && style.active,
            props.interactive && style.interactive,
            props.center && style.center
        ));
    return !!container.current && visible &&
        ReactDOM.createPortal(
            React.cloneElement(
                Children.only(props.children) as ReactElement, {
                    active: +active,
                    onClose: props.onClose,
                    ...(props.children as ReactElement).props
                }
            ),
            container.current
        );
};

Modal.defaultProps = {
    outTime: 0
};

interface Props {
    visible:boolean;
    outTime?:number;
    interactive?:boolean;
    center?:boolean;
    onClose?:()=> void;
}

export default Modal;
