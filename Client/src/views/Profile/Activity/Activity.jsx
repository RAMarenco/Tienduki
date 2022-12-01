import classes from './Activity.module.scss';

import CollectionProduct from '../../../components/Stores/Collections/CollectionProducts/CollectionProduct';
import Card from '../../../components/Card/RecentStoreCard/RecentStoreCard';

import { useAuth } from './../../../core/AuthRoleUser';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Activity = () => {
    const user = useAuth().role;
    const [products, setProduct] = useState([]);
    const [activityDone, setActivityDone] = useState(false);
    const handleNoAuthMessage = useOutletContext();
    const navigate = useNavigate();

    const GetProducts = () => {
        setActivityDone(false);
        fetch(`https://tienduki.up.railway.app/api/clientActivity/Product/${useAuth().user._id}`)
        .then(
            response => response.json().then(data => {
                setProduct(data);
                setActivityDone(true);
            })
        )
    }

    useEffect(() => {
        if(user === "Vendor" || user === "Admin") {
            handleNoAuthMessage();
            navigate('/');
            return;
        }
        GetProducts();
    }, []);

    return (
        <div className={ classes["Activity"] }>
            <div className={classes["Recent-Products"] }>
                <div className={ classes["Recent-Title"] }>
                    <h2>Productos recientes</h2>
                    <div className={ classes["Line"] }></div>
                </div>
                
                <div className={ classes["Recent-Products-Container"] }>
                    <div className={ classes["Recent-Products-Cards"] }>
                        {
                            products.map(product => {                                
                                return (
                                    <CollectionProduct key={product.id_activity.id_element._id} storeid={product.id_activity.id_element._id_store._id} storeName={product.id_activity.id_element._id_store.username} id={product.id_activity.id_element._id} Name={product.id_activity.id_element.name} Price={product.id_activity.id_element.price.$numberDecimal} Image={product.id_activity.id_element.image_product[0]?.imageUrl} HideWishList={true}/>
                                )
                            })
                        }
                    </div>                    
                </div>
            </div>
            <div className={classes["Recent-Stores"] }>
                <div className={ classes["Recent-Title"] }>
                    <h2>Tiendas Recientes</h2>
                    <div className={ classes["Line"] }></div>
                </div>                    
                <div className={ classes["Recent-Stores-Container"] }>
                    <div className={ classes["Recent-Stores-Cards"] }>
                        <Card extraclasses={["recent-stores"]} type="StoreSphere" activity={true}/>
                    </div>                    
                </div>
            </div>
        </div>        
    );
}

export default Activity;