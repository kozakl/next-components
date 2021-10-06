import {FunctionComponent} from 'react';
import {default as PrivateRoute} from './PrivateRoute';

export function withPrivateRoute<P>(Component:FunctionComponent<P>, admin?:boolean)
{
    return (props:P & PrivateRouteProps)=> {
        return (
            <PrivateRoute admin={admin} {...props}>
                <Component {...props}/>
            </PrivateRoute>
        );
    }
}

interface PrivateRouteProps {
    admin?:boolean;
}
