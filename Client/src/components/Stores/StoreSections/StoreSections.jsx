import classes from './StoreSections.module.scss';

import StoreSphere from './StoreSpheres/StoreSphere';
import CategorySphere from './CategorySphere/CategorySphere';

import {FaHeartBroken} from 'react-icons/fa';

const StoreSections = ({ Category = "", Stores = [] }) => {    
    const StoresData = Stores.map(Store => {        
        return (
            <StoreSphere key={Store._id} Store={Store}/>
        );        
    })

    const categorysphere = <CategorySphere key={Category} Category={Category}/>

    return (
        <div className={ classes["StoreSections"] }>
            <div className={ classes["Category-Title"] }>
                <div className={ classes["Title"] }>
                    <h2>
                        { Category }
                    </h2>
                </div>
                <div className={ classes["Line"] }></div>
            </div>
            <div className={ classes["Stores"] }>
                <div className={ classes["Stores-Spheres"] }>
                    {Stores.length === 0 ? 
                        <>
                            <div className={ classes["SadIcon"]}>
                                <FaHeartBroken/>
                                <h2>No hay tiendas para mostrar</h2>
                            </div>
                            
                        </>  
                        :
                        <>
                            { StoresData }
                            { categorysphere }
                        </>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default StoreSections;