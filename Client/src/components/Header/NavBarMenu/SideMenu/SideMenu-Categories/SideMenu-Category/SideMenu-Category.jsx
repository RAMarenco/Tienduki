import classes from './SideMenu-Category.module.scss';

import { GiDiamondRing, GiPaintedPottery } from 'react-icons/gi';
import { RiCake3Line, RiCarFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const SideMenu_Category = ({ category = ""}) => {

    const icons = [
        {
            "icon": GiDiamondRing,
            "category": "Bisuteria"
        },
        {
            "icon": RiCake3Line,
            "category": "Postres"
        },
        {
            "icon": GiPaintedPottery,
            "category": "Artesania"
        },
        {
            "icon": RiCarFill,
            "category": "Transporte"
        }
    ]

    const iconToUse = icons.findIndex((element) => element.category === category);    
    const IconSVG = iconToUse === -1 ? "" : icons[iconToUse].icon;

    return (
        <Link to={category  ? `/Stores/Category/${category}` : ""} className={ classes["SideMenu_Category"] }>
            <div className={ classes["Category-info"] }>
                {IconSVG !== "" && <IconSVG/>}{category}
            </div>
            <IoIosArrowForward/>
        </Link>
    )
}

export default SideMenu_Category;