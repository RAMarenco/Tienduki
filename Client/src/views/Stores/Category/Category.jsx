import classes from './Category.module.scss';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryStores from '../../../components/Stores/CategoryStores/CategoryStores';
import Spinner from '../../../components/Spinner/Spinner';


import {FaHeartBroken} from 'react-icons/fa';

const Category = () => {
    const { Category } = useParams();
    const [ stores, setStores ] = useState([]);
    const [ isloading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    const GetProductsCategory = () => {
        setIsLoading(true);
        fetch(`https://tienduki.up.railway.app/api/storeCategory/storeCategory/${Category}`)
        .then(
            response => response.json().then(data => {
                setStores(data);
                toast.success("Datos cargados satisfactoriamente.", {
                    toastId: "Exito"
                });
                setIsLoading(false);
        }).catch(() => {
            toast.error("No se pudieron cargar los datos.", {
                toastId: "Error"
            });
            setIsLoading(false);
        }));
    }

    useEffect(() => {
        GetProductsCategory();
    }, [Category]);

    useEffect(() => {
        if (!isloading && stores.length === 0) {
            navigate('/Stores');
            return;
        }
        
    }, [isloading]);

    if(!isloading && stores.length !== 0) {
        return (
            <div className={ classes["Category"] }>            
                <div className={ classes["Category-Title"] }>
                    <div className={ classes["Title"] }>
                        <h2>
                            { Category }
                        </h2>
                    </div>
                    <div className={ classes["Line"] }></div>
                </div>
                <div className={ classes["Stores"] }>
                    {stores[0].stores.length === 0 ? 
                        <div className={ classes["SadIcon"]}>
                            <FaHeartBroken/>
                            <h2>No hay tiendas para mostrar</h2>
                        </div>
                        :
                        <CategoryStores Stores={ stores[0].stores }/>
                    }                    
                </div>
            </div>
        )
    }

    return (
        <Spinner isloading={isloading}/>
    )
    
}

export default Category;