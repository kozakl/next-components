import {FunctionComponent, useEffect, useState} from 'react';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import {ImageLite} from '../image-lite';
import {fade} from '../../transitions';
import style from './BackgroundCrossfade.module.css';

const BackgroundCrossfade:FunctionComponent<Props> = (props)=>
{
    const [current, setCurrent] = useState(0),
          [next, setNext] = useState(1),
          [loadedNext, setLoadedNext] = useState(false),
          [loadedFirst, setLoadedFirst] = useState(false);
    
    useEffect(()=> {
        if (loadedNext) {
            const timeout = setTimeout(()=> {
                setLoadedNext(false);
                setCurrent((current + 1) % props.images.length);
            }, props.speed);
            
            return ()=>
                clearTimeout(timeout);
        }
    }, [loadedNext]);
    
    return (
        <div
            className={style.backgroundCrossfade}
            style={{background: props.background}}>
            
            
            {loadedFirst &&
                <ImageLite
                    className={style.imageBack}
                    thumb={`${props.images[next]}?w=1280`}
                    srcSet={`${props.images[next]}?w=1280&q=90 1280w,
                             ${props.images[next]}?w=1680&q=90 1680w,
                             ${props.images[next]}?w=1920&q=90 1920w`}
                    onLoadThumb={()=> {
                        setLoadedNext(true);
                    }}/>}
            
            <SwitchTransition >
                <CSSTransition
                    classNames={fade}
                    key={`${current}`}
                    addEndListener={(node, complete)=> {
                        node.addEventListener('transitionend', ()=> {
                            complete();
                            setNext((current + 1) % props.images.length);
                        }, false);
                        
                    }}>
                        
                    <ImageLite
                        className={style.image}
                        thumb={!loadedFirst ?
                            `${props.images[current]}?w=100&b=1` :
                            `${props.images[current]}?w=1280`}
                        srcSet={`${props.images[current]}?w=1280&q=90 1280w,
                                 ${props.images[current]}?w=1680&q=90 1680w,
                                 ${props.images[current]}?w=1920&q=90 1920w`}
                        onLoadThumb={()=>
                            setLoadedFirst(true)}/>
                </CSSTransition>
            </SwitchTransition>
            
             
        </div>
    )
};

BackgroundCrossfade.defaultProps = {
    speed: 2250
};

interface Props {
    background?:string;
    speed?:number;
    images:string[];
}

export default BackgroundCrossfade;
