import classes from './NavBarMenu.module.scss';
import logo from '../../../assets/logo.png';
import { MdMenu } from 'react-icons/md';
import { Link } from "react-router-dom";

import { useAuth } from '../../../core/AuthRoleUser';

const NavBarMenu = ({onClickMenu}) => {
    return (
        <div className={ classes["NavBarMenu"] }>
            <div>
                <MdMenu className={ useAuth().role === "Admin" || useAuth().role === "Vendor" ? `${classes["NavBarMenu-Icon"]} ${classes["OnlyPhone"]}` : classes["NavBarMenu-Icon"]} onClick={onClickMenu}/>
            </div>
            
            <Link to="/">
                <figure className={ classes["logo-container"] }>
                    <img src={ logo } className={ classes["logo"] } alt="Tienduki-logo" />
                </figure>
            </Link>            
        </div>
    );
}

export default NavBarMenu;