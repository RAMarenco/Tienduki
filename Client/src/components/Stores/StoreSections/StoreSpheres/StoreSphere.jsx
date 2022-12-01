import classes from './StoreSphere.module.scss';

import { Link } from 'react-router-dom';

const StoreSphere = ({ Store = [], extraClass="", user }) => {
    const images = Store.image_user.findIndex(image => image.id_image_type.category === "Profile");
    if (user === "Vendor") {
        return (
            <Link to={""} className={ extraClass ? `${classes["StoreSphere"]} ${classes[extraClass]}` : classes["StoreSphere"] }>        
                <img src={images !== -1 ? Store.image_user[images].imageUrl : "https://thumbs.dreamstime.com/b/store-icon-market-retail-shop-commercial-print-media-web-any-type-design-projects-185043121.jpg"} alt={Store.Store} />
            </Link>
        );
    } else {
        return (
            <Link to={Store ? `/Stores/Store/${Store._id}/${Store.username}` : ""} className={ extraClass ? `${classes["StoreSphere"]} ${classes[extraClass]}` : classes["StoreSphere"] }>        
                <img src={images !== -1 ? Store.image_user[images].imageUrl : "https://thumbs.dreamstime.com/b/store-icon-market-retail-shop-commercial-print-media-web-any-type-design-projects-185043121.jpg"} alt={Store.Store} />
            </Link>
        );
    }
    
};

export default StoreSphere;