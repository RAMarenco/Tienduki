import classes from './StoreCard.module.scss';

import { Link } from 'react-router-dom';

const StoreCard = ( {id = "", Store = "", Image = ""} ) => {
    return (
        <div className={ classes["StoreCard"] }>
            <Link to={(Store && Store !== "") ? `/Stores/Store/${id}/${Store}` : ""}>
                <div className={ classes["Image-Container"] }>
                    { Image !== "" ? 
                        <img src={Image} alt={Store} /> :
                        <div className={ classes["No-Image"] }>

                        </div>
                    }                    
                </div>
                <div className={ classes["StoreName-Container"] }>
                    <h3 className={ classes["Title"] }>{ Store }</h3>
                </div>
            </Link>            
        </div>
    );
}

export default StoreCard;