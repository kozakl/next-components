import {FunctionComponent, useEffect} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {default as Router} from 'next/router';
import {getSession, GetSession} from '../../actions';
import {Session, StoreState} from '../../types';

const PrivateRoute:FunctionComponent<Props> = (props)=>
{
    useEffect(()=> {
        props.getSession()
            .then((result)=> {
                if (!result.session?.user ||
                    (props.admin &&
                        !result.session?.user.admin)) {
                    Router.push('/');
                }
            })
    }, []);
    
    return props.session && (
        <>
            {(props.session?.user &&
             !(props.admin &&
                !props.session?.user.admin)) &&
                props.children}
        </>
    )
};

interface Props {
    admin?:boolean;
    session:Session;
    getSession:()=> Promise<GetSession>;
}

function mapStateToProps(state:StoreState) {
    return {
        session: state.session
    };
}

function mapDispatchToProps(
    dispatch:ThunkDispatch<StoreState, void,
        GetSession>) {
    return {
        getSession: ()=>
            dispatch(getSession())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
