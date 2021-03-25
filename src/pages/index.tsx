import Head from 'next/head'
import {FunctionComponent} from 'react';

const Index:FunctionComponent = ()=>
{
    return (
        <div>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta name="theme-color" content="#E8E0BC"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="manifest" href="/manifest.json"/>
                
                <title>Next Components</title>
            </Head>
            <main>
                Next Components
            </main>
        </div>
    );
};

export default Index;
