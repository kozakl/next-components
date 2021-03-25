import {FunctionComponent} from 'react';
import {AppProps} from 'next/app'
import '../main.css';

const App:FunctionComponent<AppProps> = ({Component, pageProps}:AppProps)=>
{
    return <Component {...pageProps} />
};

export default App;
