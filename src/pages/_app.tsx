import {FunctionComponent} from 'react';
import {AppProps} from 'next/app'
import '../main.css';

const App:FunctionComponent<AppProps> = ({Component, pageProps}:AppProps)=> {
    return (
        <>
            <Component {...pageProps}/>
            <div id="modal-root"/>
        </>
    )
};

if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    window.addEventListener('resize', ()=>
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`));
}

export default App;
