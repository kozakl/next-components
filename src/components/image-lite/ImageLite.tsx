import {CSSProperties, FunctionComponent,
        memo, MouseEvent, useEffect,
        useRef, useState} from 'react';

const ImageLite:FunctionComponent<Props> = memo((props)=>
{
    const img = useRef<HTMLImageElement>();
    const [prevThumb, setPrevThumb] = useState(null),
          [loadedThumb, setLoadedThumb] = useState(false);
    
    if (props.thumb !== prevThumb) {
        setPrevThumb(props.thumb);
        setLoadedThumb(false);
    }
    
    useEffect(() => {
        if (img.current.complete) {
            onLoadThumb()
        }
    }, []);
    
    function onLoadThumb() {
        if (!loadedThumb) {
            if (props.onLoadThumb) {
                props.onLoadThumb();
            }
            setLoadedThumb(true);
        }
    }
    
    return (
        <>
            <img
                className={props.className}
                id={props.id}
                ref={img}
                src={props.thumb}
                srcSet={loadedThumb ? props.srcSet : ''}
                sizes={loadedThumb ? props.sizes : ''}
                style={{
                    ...props.style,
                    visibility: 
                        !loadedThumb && props.cleanBetween ?
                            'hidden' : 'visible'}}
                alt={props.alt}
                loading={props.loading}
                onClick={props.onClick}
                onLoad={onLoadThumb}/>
            <noscript>
                <img
                    className={props.className}
                    srcSet={props.srcSet}
                    sizes={props.sizes}
                    alt={props.alt}
                    loading={props.loading}/>
            </noscript>
        </>
    );
});

ImageLite.defaultProps = {
    alt: ''
};

interface Props {
    className?:string;
    id?:string;
    thumb:string;
    srcSet:string;
    sizes?:string;
    style?:CSSProperties;
    alt?:string;
    loading?:'lazy' | 'eager';
    cleanBetween?:boolean;
    onClick?:(event:MouseEvent<HTMLDivElement>)=> void;
    onLoadThumb?:()=> void;
}

export default ImageLite;
