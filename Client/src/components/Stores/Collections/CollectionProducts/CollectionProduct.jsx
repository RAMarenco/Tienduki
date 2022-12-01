import classes from './CollectionProduct.module.scss';

import { Link } from 'react-router-dom';
import { RiStarSFill } from 'react-icons/ri';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../core/AuthRoleUser';

const CollectionProduct = ( {id, Name = "", Price = "", Image = "", Store = "", isfavorite = false, removeFromWishList, HideWishList = false, storeid = "", storeName = ""} ) => {

    const [favorite, setFavorite] = useState(isfavorite);    

    const handleClick = () => {
        fetch(`https://tienduki.up.railway.app/api/clientWishList/`, {
            method: favorite ? "DELETE":"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_product:id,
                id_client:useAuth().user._id
            }),
        }).then(
            (response) => response.json()
        ).then((data) => {
            setFavorite(!favorite);
        }).catch(() => {
            toast.error(`No se pudo realizar la acción`);
        })

        if(favorite){
            toast.warn("Eliminado de favoritos.");
            removeFromWishList(id);
            return;
        }
        toast.success("Añadido a favoritos.");
    }

    return (
        <div className={ classes["CollectionProduct-container"] }>
            {useAuth().role !== "" && !HideWishList && <div className={ classes["Add-to-favorite"] } onClick={handleClick}><RiStarSFill className={favorite ? classes["favorite"]  : ""}/></div>}
            <Link to={storeName !== "" ? `/Stores/Store/${storeid}/${storeName}/Product/${id}/${Name}` : Name ? `./Product/${id}/${Name}` : ``} className={ classes["CollectionProduct"] }>
                
                <div className={ classes["Product-image"] }>
                    {Image !== "" ? <img src={Image} alt={`${Name}`} /> : <div className={ classes["Empty"] }></div> }
                    <div className={ classes["Store-Name"] }>
                        <h5>
                            {Store ? Store : ""}
                        </h5>
                    </div>
                </div>
                <div className={ classes["Product-details"] }>
                    <h5 className={ classes["Product-name"] }>
                        {Name ? Name : ""}
                    </h5>
                    <div className={ classes["Product-price"]}>                    
                        <p>
                        { Price ? Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(Price)
                            : 
                            ""
                        }  
                        </p>              
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CollectionProduct;