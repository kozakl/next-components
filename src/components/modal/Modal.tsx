import {Children, cloneElement,
        FunctionComponent, ReactElement,
        useEffect, useRef, useState} from 'react';
import {classNames} from '@kozakl/utils';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';

const Modal:FunctionComponent<Props> = (props)=>
{
    const modal = useRef<HTMLDivElement>(),
          container = useRef<HTMLDivElement>();
    const [visible, setVisible] = useState(false),
          [active, setActive] = useState(false),
          [visibleDelay, setVisibleDelay] = useState(0),
          [activeDelay, setActiveDelay] = useState(0);
    
    useEffect(()=> {
        modal.current = document.querySelector('#modal');
        container.current = document.createElement('div');
        container.current.addEventListener('click', onClickModal);
        
        return ()=> {
            clearTimeout(visibleDelay);
            clearTimeout(activeDelay);
            container.current.removeEventListener('click', onClickModal);
            if (container.current.parentElement) {
                modal.current.removeChild(container.current);
                if (props.autoOverflow) {
                    document.body.style.overflowY = 'unset';
                }
            }
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
            
            modal.current.appendChild(container.current);
            setActiveDelay(window.setTimeout(()=>
                setActive(true), 20));
            if (props.autoOverflow) {
                document.body.style.overflowY = 'hidden';
            }
        } else if (visible && !props.visible) {
            clearTimeout(visibleDelay);
            clearTimeout(activeDelay);
            
            setVisibleDelay(window.setTimeout(()=> {
                if (container.current.parentElement) {
                    modal.current.removeChild(container.current);
                    setVisible(false);
                    if (props.autoOverflow) {
                        document.body.style.overflowY = 'unset';
                    }
                }
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
            props.transparent && style.transparent,
            props.interactive && style.interactive,
            props.center && style.center
        ));
    return !!container.current && visible &&
        ReactDOM.createPortal(
            props.render ?
                cloneElement(
                    props.render({
                        active: active,
                        onClose: props.onClose
                    })
                ) :
                cloneElement(
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
    outTime: 0,
    autoOverflow: true
};

interface Props {
    visible:boolean;
    outTime?:number;
    transparent?:boolean;
    interactive?:boolean;
    center?:boolean;
    autoOverflow?:boolean;
    render?:(
        props:{
            active?:boolean,
            onClose?:()=> void
        }
    )=> ReactElement;
    onClose?:()=> void;
}

export default Modal;
