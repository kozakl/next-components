import {FunctionComponent, useState} from 'react';
import {useInterval} from '@kozakl/hooks';
import {Badge} from '../../components/badge';
import {Layout} from '../../components/layout';
import style from './BadgeSample.module.css';

const BadgeSample:FunctionComponent = ()=>
{
    const [count, setCount] = useState(0);
    
    useInterval(()=> {
       setCount(count + 1);
    }, 500);
    
    return (
        <Layout title="Badge Sample">
            <div className={style.badgeSample}>
                <Badge>{count}</Badge>
            </div>
        </Layout>
    );
};

export default BadgeSample;
