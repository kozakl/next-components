import {FunctionComponent} from 'react';
import {default as Head} from 'next/head';
import {Toasts} from '../toasts';
import style from './Layout.module.css';

export const Layout:FunctionComponent<Props> = (props)=>
{
    return (
        <div>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta name="theme-color" content="#E8E0BC"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="manifest" href="/manifest.json"/>
                
                <title>{props.title}</title>
            </Head>
            <main>
                <div className={style.pages}>
                    {props.children}
                </div>
                <Toasts/>
            </main>
        </div>
    );
};

interface Props {
    title?:string;
}

export default Layout;
