import classes from './RecentStoreCard.module.scss';

import StoreSphere from './StoreSphere/StoreSphere';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../core/AuthRoleUser';

const Card = ( {extraclasses = [], type = "", activity = false} ) => { 
    
    const [data, setData] = useState([]);
    const [activityDone, setActivityDone] = useState(false);    

    const getActivity = () => {
        setActivityDone(false);
        fetch(`https://tienduki.up.railway.app/api/clientActivity/Store/${useAuth().user._id}`)
        .then(
            response => response.json().then(data => {
                setData(data);
                setActivityDone(true);
            })
        )
    }

    /* const getStore = async (storeid) => {
        return await         
    } */

    useEffect(() => {
        getActivity();        
    }, []);    

    if (activityDone) {
        const extraclassesJoin = extraclasses.map(eClass => {        
            return classes[eClass];
        }).join(' ');

        let dataMap = [];
        if(type === "StoreSphere") {
            dataMap = data.map(activityMain => {                
                return (
                    <StoreSphere key={activityMain.id_activity.id_element._id} store={activityMain.id_activity.id_element}/>
                );
            });
        }

        if (dataMap.length < 4) {
            const datamaplength = dataMap.length;
            for (let i = 4; i > datamaplength; i--) {            
                const emptyStore = <StoreSphere key={`none${i}`} store={{id:i,store:"none"}}/>
                dataMap=[...dataMap, emptyStore];
            }
        }
        
        return (
            <>
            { !activity ? 
                <div className={ [classes["Card"], extraclassesJoin].join(" ") }>
                    { dataMap && type === "StoreSphere" && 
                        <div className={ classes["StoreSpheres"] }>
                            <h3>
                                Tiendas recientes
                            </h3>
                            { dataMap }
                        </div>
                    }
                </div> :
                <>
                { dataMap }
                </>
            }
            </>
        );
    }
}

export default Card;