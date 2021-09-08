import {FunctionComponent, useEffect, useState} from 'react';
import {BackgroundImage} from './background-image';
import style from './BackgroundCrossfade.module.css';

const BackgroundCrossfade:FunctionComponent<Props> = (props)=>
{
    const [images, setImages] = useState([props.images[0]]),
          [current, setCurrent] = useState(1),
          [loadedThumb, setLoadedThumb] = useState(false),
          [isFirst, setIsFirst] = useState(true);
    
    useEffect(()=> {
        if (loadedThumb) {
            const timeout = setTimeout(()=> {
                setLoadedThumb(false);
                setIsFirst(false);
                setCurrent((current + 1) % props.images.length);
                setImages([
                    images[images.length - 1],
                    props.images[current]
                ]);
            }, props.speed);
            
            return ()=>
                clearTimeout(timeout);
        }
    }, [loadedThumb]);
    
    return (
        <div
            className={style.backgroundCrossfade}
            style={{background: props.background}}>
            {images.map((image, index)=>
                <BackgroundImage
                    className={style.image}
                    key={image}
                    thumb={isFirst ?
                        `${image}?w=100&b=1` :
                        `${image}?w=1280`}
                    srcSet={`${image}?w=1280&q=90 1280w,
                             ${image}?w=1680&q=90 1680w,
                             ${image}?w=1920&q=90 1920w`}
                    isFirst={isFirst}
                    onLoadThumb={()=> {
                        if (index === images.length - 1) {
                            setLoadedThumb(true);
                        }
                    }}/>)}
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
