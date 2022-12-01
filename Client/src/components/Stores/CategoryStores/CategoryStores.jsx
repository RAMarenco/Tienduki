import classes from './CategoryStores.module.scss';
import StoreCard from '../../Card/StoreCard/StoreCard';

const CategoryStores = ({ Stores = [] }) => {
    const storeCards = Stores.map(store => {
        const images = store.image_user.findIndex(image => image.id_image_type.category === "Profile");
        return <StoreCard key={store._id} id={store._id} Store={store.username} Image={images !== -1 ? store.image_user[images].imageUrl : ""}/>
    });
    return (
        <div className={ classes["CategoryStores"] }>
            { storeCards }
        </div>
    );
}

export default CategoryStores;