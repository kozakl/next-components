import {FunctionComponent, ReactNode,
        useState} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {useRouter} from 'next/router';
import {useMatchMedia} from '@kozakl/hooks';
import {classNames} from '@kozakl/utils';
import {EditUserModal} from '../edit-user-modal';
import {NavLink} from '../nav-link';
import {ToastClose} from '../toasts/toast-close';
import {Toggle} from './toggle';
import {logout, Logout,
        showToast, ShowToast} from '../../actions';
import {StoreState, User} from '../../types';
import style from './NavBar.module.css';

const NavBar:FunctionComponent<Props> = (props)=>
{
    const router = useRouter();
    const [mobile, setMobile] = useState(null),
          [open, setOpen] = useState({value: false, transit: false}),
          [editUser, setEditUser] = useState(null);
    
    useMatchMedia((event)=> {
        setMobile(event.matches);
        setOpen({value: false, transit: false});
    }, '(max-width: 767px)');
    
    const navBarClass = classNames(
        style.navBar,
        props.className
    );
    const linksClass = classNames(
        style.links,
        mobile && 
            !open.value && style.close,
        open.transit && style.transit
    );
    return (
        <nav
            className={navBarClass}
            style={{display: mobile !== null ?
                'block' : 'none'}}>
            <div className={style.container}>
                {!mobile &&
                    <div className={style.line}/>}
                <div
                    className={linksClass}
                    onClick={()=>
                        mobile &&
                            setOpen({value: false, transit: true})}>
                    <NavLink
                        className={style.link}
                        activeClass={style.active}
                        href="/">
                        Targi Kredytowe
                    </NavLink>
                    <NavLink
                        className={style.link}
                        activeClass={style.active}
                        href="/offer">
                        Porównanie ofert
                    </NavLink>
                    <NavLink
                        className={style.link}
                        activeClass={style.active}
                        href="/contact-form">
                        Formularz kontaktowy
                    </NavLink>
                    <NavLink
                        className={style.link}
                        activeClass={style.active}
                        href="/contact">
                        Kontakt
                    </NavLink>
                </div>
                {mobile && !props.user &&
                    <div className={style.bottom}>
                        <Toggle
                            className={style.toggle}
                            cross={open.value}
                            onChange={()=>
                                setOpen({value: !open.value, transit: true})}/>
                        <div/>
                    </div>}
                {mobile && props.user &&
                    <div className={style.bottom}>
                        <Toggle
                            className={style.toggle}
                            cross={open.value}
                            onChange={()=>
                                setOpen({value: !open.value, transit: true})}/>
                        <div>
                            <a
                            className={style.name}
                            href="#"
                            onClick={(event)=> {
                                event.preventDefault();
                                setEditUser(!editUser);
                            }}>
                            {props.user.firstName} {props.user.lastName}
                        </a>
                            <button
                                className={style.logout}
                                title="Wyloguj"
                                onClick={()=>
                                    props.logout()
                                        .then(()=> {
                                            router.push('/');
                                            props.showToast(
                                                <>
                                                    <span>Zostałeś wylogowany</span>
                                                    <ToastClose/>
                                                </>,
                                                true
                                            );
                                        })
                                }>
                                <img src={require('res/nav-bar/logout.svg')}/>
                            </button>
                        </div>
                    </div>}
            </div>
            <EditUserModal
                user={props.user}
                visible={editUser}
                onClose={()=>
                    setEditUser(!editUser)}
                profile/>
        </nav>
    );
};

interface Props {
    className?:string;
    user:User;
    logout:()=> Promise<Logout>;
    showToast:(body:ReactNode, autoClose?:boolean)=> ShowToast;
}

function mapStateToProps(state:StoreState) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(
    dispatch:ThunkDispatch<StoreState, void,
        Logout |
        ShowToast>) {
    return {
        logout: ()=>
            dispatch(logout()),
        showToast: (body:ReactNode, autoClose?:boolean)=>
            dispatch(showToast(body, autoClose))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
