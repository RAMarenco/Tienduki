import classes from './WishList.module.scss';

import CollectionProduct from './../../../components/Stores/Collections/CollectionProducts/CollectionProduct';

import { useAuth } from './../../../core/AuthRoleUser';
import { toast } from 'react-toastify';
import { useNavigate, useOutletContext} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from './../../../components/Spinner/Spinner';

const WishList = () => {
    const user = useAuth().role;
    const [WishList, setWishList] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const handleNoAuthMessage = useOutletContext();
    const navigate = useNavigate();

    const getWishList = () => {
        setIsLoading(true)
        fetch(`https://tienduki.up.railway.app/api/clientWishList/All/${useAuth().user._id}`).then(
            response => response.json().then(data => {
                setWishList(data);
                setIsLoading(false);
                if (data.length > 0) {
                    toast.success("Datos cargados satisfactoriamente.", {
                        toastId: "Exito"
                    });
                }
            })
        )
    }

    const removeFromWishList = (id) => {
        const newWishList = WishList.filter(element => element.id_product._id !== id);
        setWishList(newWishList);
    }

    useEffect(() => {
        if(user === "Vendor" || user === "Admin") {
            handleNoAuthMessage();
            navigate('/Profile');
            return;
        }
        getWishList();
    }, []);

    if(!isloading) {
        const WishListMap = WishList.map((element) => {
            return (
                <CollectionProduct key={element.id_product._id} removeFromWishList={removeFromWishList} isfavorite={true} id={element.id_product._id} Store={element.id_product._id_store.username} Name={element.id_product.name} Image={element.id_product.image_product[0]?.imageUrl} Price={element.id_product.price.$numberDecimal}/>
            )
        })
    
        return (
            <div className={ classes["WishList"] } >
                <div className={ classes["WishList-Title"] }>
                    <h2>Lista de deseados</h2>
                    <div className={ classes["Line"] }></div>
                </div>
                <div className={ classes["WishList-Products"] }>
                    {WishListMap}
                </div>
            </div>
        );
    }
}

export default WishList;