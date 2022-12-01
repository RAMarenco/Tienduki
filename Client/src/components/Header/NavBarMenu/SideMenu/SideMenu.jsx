import classes from './SideMenu.module.scss';

import { useAuth } from '../../../../core/AuthRoleUser';

import SideMenu_SearchBar from "./SideMenu-SearchBar/SideMenu-SearchBar";
import Actions from '../../../Actions/Actions';
import SideMenu_Categories from "./SideMenu-Categories/SideMenu-Categories";

const SideMenu = ({ menuElements = [], isOpen = false }) => {
    const user = useAuth().role;
    return (
        <div className={ `${classes["SideMenu"]} ${isOpen ? classes["SideMenu-active"] : ""}` }>
            <div className={ classes["SideMenu-Container"]  }>
                {/* <SideMenu_SearchBar /> */}
                <div className={ classes["SideMenu-Actions"] }>
                    <Actions menuElements={ menuElements } menuType="Side"/>
                </div>
                {(user === "Client" || user === "") &&
                    <SideMenu_Categories/>
                }
            </div>            
        </div>
        
    );
}

export default SideMenu;