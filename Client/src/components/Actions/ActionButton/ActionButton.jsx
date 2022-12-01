import classes from './ActionButton.module.scss';
import { Link } from "react-router-dom";
import { MdLogout, MdPerson, MdStore, MdShoppingCart, MdLogin, MdPeople } from 'react-icons/md';
import { useLocation } from 'react-router-dom'

const ActionButton = ({ Icon = "", extraClass = "", Url = "" }) => {
    const location = useLocation();
    const icons = [
        {
            IconName: "LogOut",
            Message: "Cerrar sesión",
            Icon: MdLogout,
        },
        {
            IconName: "LogIn",
            Message: "Iniciar sesión",
            Icon: MdLogin,
        },
        {
            IconName: "Profile",
            Message: "Perfil",
            Icon: MdPerson,
        },
        {
            IconName: "Stores",
            Message: "Tiendas",
            Icon: MdStore,
        },
        {
            IconName: "Cart",
            Message: "Carrito",
            Icon: MdShoppingCart,
        },
        {
            IconName: "Users",
            Message: "Usuarios",
            Icon: MdPeople,
        },
        {
            IconName: "Store",
            Message: "Tienda",
            Icon: MdStore,
        }
    ];

    const iconToUse = icons.filter(icon => icon.IconName === Icon);
    
    Icon = iconToUse[0].Icon;
    const IconName = iconToUse[0].IconName;
    const iconToUseElements = iconToUse.length !== 0 ? [
        <Icon key={ Icon } className={ classes["Icon"] } />,
        <p key={ iconToUse[0].IconName } className={ classes["IconMessage"] }> {iconToUse[0].Message}</p>
    ] : "";

    let classesButton = [classes["ActionButton"], classes[extraClass[0]]];

    if(IconName === 'Profile') {
        classesButton = [...classesButton, classes["Profile"]];
    }

    if(location.pathname === Url) {
        classesButton = [...classesButton, classes["activeActionButton"]];
    }

    return (
        <>
        {
            IconName === 'Profile' ?
            <Link to={ Url } className={ classesButton.join(" ") }>
                { iconToUseElements }
                <div className={ classes["Profile-decoration"] }>
                </div>
            </Link>
            :
            <Link to={ Url } className={ classesButton.join(" ") }>
                { iconToUseElements }
            </Link>            
        }
        
        </>
    );
}

export default ActionButton;