import classes from './StoreSphere.module.scss';

import { Link } from 'react-router-dom';

const StoreSphere = ( {store = []} ) => {
    const images = store.image_user?.findIndex(image => image.id_image_type.category === "Profile");
    return (
        
        <Link to={(store && store.store !== "none") ? `/Stores/Store/${store._id}/${store.username}` : ""} className={ classes["StoreSphere"] }>
        {store.store !== "" && store.store !== "none" ? 
            <img src={images !== -1 ? store.image_user[images].imageUrl : "https://thumbs.dreamstime.com/b/store-icon-market-retail-shop-commercial-print-media-web-any-type-design-projects-185043121.jpg"} alt={store.Store} />
            :
            <div className={ classes["empty"] }></div>
        }        
        </Link>
    );
};

export default StoreSphere;