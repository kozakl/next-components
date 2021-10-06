import {AnchorHTMLAttributes,
        FunctionComponent} from 'react';
import {default as Link} from 'next/link';
import {useRouter} from 'next/router';
import {classNames} from '@kozakl/utils';

const NavLink:FunctionComponent<Props> = (props)=>
{
    const {asPath} = useRouter();
    const navLinkClass = classNames(
        props.className,
        props.active && props.activeClass ||
            (props.startWith ?
                asPath.startsWith(props.href) :
                asPath == props.href) &&
                    props.activeClass
    );
    return (
        <Link href={props.href}>
            <a
                className={navLinkClass}
                title={props.title}
                onClick={props.onClick}>
                {props.children}
            </a>
        </Link>
    );
};

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?:string;
    activeClass?:string;
    active?:boolean;
    startWith?:boolean;
}

export default NavLink;
