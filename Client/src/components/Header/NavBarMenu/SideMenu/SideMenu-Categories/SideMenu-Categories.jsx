import classes from './SideMenu-Categories.module.scss';

import { useState, useEffect } from 'react';

import SideMenu_Category from './SideMenu-Category/SideMenu-Category';
import { toast } from 'react-toastify';

const SideMenu_Categories = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://tienduki.up.railway.app/api/storeCategory/").then(
            response => response.json().then(data => {
                setData(data);                
            })
        ).catch(() => {
            toast.error("No se pudieron cargar los datos", {
                toastId: "Error"
            });
            setIsLoading(false);
        })
    }, []);    

    const dataMap = data.map((category, index) => {
        return (
            <SideMenu_Category key={index} category={category.category}/>
        );
    });
    
    return (
        <div className={ classes["SideMenu_Categories"] }>
            <div className={ classes["Category-Title"] }>
                <div className={ classes["Title"] }>
                    <h2>
                        Categorías
                    </h2>
                </div>
                <div className={ classes["Line"] }></div>
            </div>
            { dataMap }
        </div>
    );
}

export default SideMenu_Categories;