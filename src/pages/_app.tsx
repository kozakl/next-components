import {FunctionComponent} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {store} from '../reducers';
import '../main.css';

const App:FunctionComponent<AppProps> = ({Component, pageProps}:AppProps)=> {
    return (
        <Provider store={store}>
            <Component {...pageProps}/>
            <div id="modal"/>
        </Provider>
    )
};

if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    window.addEventListener('resize', ()=>
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`));
}

export default App;
