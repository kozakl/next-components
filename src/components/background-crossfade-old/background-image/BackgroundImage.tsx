import {FunctionComponent, useState} from 'react';
import {classNames} from '@kozakl/utils';
import {ImageLite} from '../../image-lite';
import style from './BackgroundImage.module.css';

const BackgroundImage:FunctionComponent<Props> = (props)=>
{
    const [show, setShow] = useState(false);
    
    const imageClass = classNames(
        style.image,
        props.className,
        show && !props.isFirst &&
            style.showTrans,
        show && props.isFirst &&
            style.show
    );
    return (
        <ImageLite
            className={imageClass}
            thumb={props.thumb}
            srcSet={props.srcSet}
            onTransitionEnd={props.onLoadThumb}
            onLoadThumb={()=> {
                setShow(true);
                if (props.isFirst) {
                    props.onLoadThumb();
                }
            }}/>
    );
};

interface Props {
    className?:string;
    id?:string;
    thumb?:string;
    srcSet:string;
    isFirst:boolean;
    onLoadThumb?:()=> void;
}

export default BackgroundImage;
