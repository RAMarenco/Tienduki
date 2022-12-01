import classes from './Stores.module.scss';
import StoreSections from '../../components/Stores/StoreSections/StoreSections';
import { useAuth } from '../../core/AuthRoleUser';
import { useOutlet, useOutletContext, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Spinner from './../../components/Spinner/Spinner';
import AdminStores from './../../components/AdminStores/AdminStores';

const Stores = () => {
    const user = useAuth().role;
    const outlet = useOutlet();

    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    const handleNoAuthMessage = useOutletContext();    

    const navigate = useNavigate();

    const GetStores = () => {
        setIsLoading(true);
        fetch("https://tienduki.up.railway.app/api/storeCategory/limit/9")
        .then(
            response => response.json().then(data => {
                setData(data);                
                setIsLoading(false);
            })
        ).catch(() => {
            toast.error("No se pudieron cargar los datos", {
                toastId: "Error"
            });
            setIsLoading(false);
        })
    }

    useEffect(() => {        
        if(user === "Vendor") {
            handleNoAuthMessage();
            navigate('/');
            return;
        } else if (user === "Admin") {
            setIsLoading(false);
            return;
        } else if (outlet) {
            setIsLoading(false);
            return;
        }
        GetStores();
    }, [outlet]);

    if (!isloading) {
        const dataMap = data.map(
            Stores => {
                return (
                    <StoreSections key={Stores.category} Category={Stores.category} Stores={Stores.stores}/>
                );            
            }
        );
        
        return (
            <div className={ classes["Stores"] }>
                {outlet ? <Outlet/> :
                    (user === "Client" || user === "") ? 
                    <>
                        { dataMap }
                    </>
                    :
                    user === "Admin" && 
                    <AdminStores/>
                }
            
            </div>
        );
    }    

    return (
        <Spinner isloading={isloading}/>
    )
}

export default Stores;