import classes from './Store.module.scss';

import { useState, useEffect } from 'react';
import { useParams, useOutlet, Outlet, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'

import StoreSphere from '../../../components/Stores/StoreSections/StoreSpheres/StoreSphere';
import Collections from '../../../components/Stores/Collections/Collections';
import { toast } from 'react-toastify';
import Spinner from './../../../components/Spinner/Spinner';

import { useAuth } from '../../../core/AuthRoleUser';

const Store = () => {
    const {id, Store} = useParams();
    const outlet = useOutlet();

    const [data, setData] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [isloading, setIsLoading] = useState(true);
    const [activityDone, setActivityDone] = useState(false);
    const [activity, setActivity] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = () => {
        setIsLoading(true);     
        fetch(`https://tienduki.up.railway.app/api/storeCategory/byId/${id}`, {
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            }
        })
        .then(
            response => {                
                if (response.ok) {
                    return response.json().then(data => {
                        setData(data);
                        toast.success("Datos cargados satisfactoriamente.", {
                            toastId: "Exito"
                        });
                        setIsLoading(false);                        
                    })
                }
                throw new Error('Something went wrong');
            }
        ).catch((error) => {
            toast.error("No se pudieron cargar los datos de las tienda.", {
                toastId: "Error"
            });
            setIsLoading(false);
        })
    }

    const fetchRatingData = () => {        
        fetch(`https://tienduki.up.railway.app/api/storeRating/${id}`, {
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            }
        })
        .then(
            response => response.json().then(data => {
                setRatingData(data);
                toast.success("Datos cargados satisfactoriamente.", {
                    toastId: "Exito"
                });                
            }).catch(() => {
                toast.error("No se pudieron cargar los datos.", {
                    toastId: "Error"
                });                
            })
        )
    }

    const postRating = (rating) => {
        fetch(`https://tienduki.up.railway.app/api/storeRating/`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(
                {
                    rating:rating,
                    client:useAuth().user._id,
                    store:id
                }
            ),
        }).then(
            (response) => response.json()
        ).then((data) => {
            fetchRatingData();
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const getStoreActivity = () => {
        setActivityDone(false);
        fetch(`https://tienduki.up.railway.app/api/clientActivity/getStoreActById/${useAuth().user._id}/Store`, {
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            }
        })
        .then(
            response => response.json().then(data => {
                setActivity(data);
                setActivityDone(prev => !prev);
            })
        )
    }

    const saveStoreActivity = () => {
        fetch(`https://tienduki.up.railway.app/api/activity/`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(
                {
                    id_element: id,
                    type_activity: "Store",
                    id_user: useAuth().user._id
                }
            ),
        }).then(
            (response) => response.json()            
        ).then((data) => {            
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const UpdateActivity = (activityToUpdate) => {
        fetch(`https://tienduki.up.railway.app/api/activity/${activityToUpdate.id_activity._id}`, {
            method: "DELETE",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            }
        }).then(
            (response) => response.json()            
        ).then((data) => {            
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const handleSetRatingValue = () => {
        const ratings = ratingData.map((rating) => {
            return rating.rating.$numberDecimal;
        });
        let ratingtotal = 0;
        ratings.forEach((rating) => {
            ratingtotal += Number(rating);
        });

        setRatingValue((ratingtotal/ratings.length));
    }

    useEffect(() => {      
        fetchData();        
    }, []);

    useEffect(() =>{
        fetchRatingData();
    }, []);

    useEffect(() => {        
        handleSetRatingValue();
    }, [ratingData]); 

    useEffect(() => {
        if (useAuth().role === "Client") {
            getStoreActivity();            
        }
    }, []);

    useEffect(() => {
        if (activityDone) {
            const activityMap = activity.map(activityMaping => {
                let notFound = "false";
                if (activityMaping.id_activity.id_element === id) {
                    return {found: "true"};
                }else {
                    return {found: notFound};                    
                }
            });

            const activityNotRegistered = activityMap.find(activityMapped => {
                return activityMapped.found === "true"
            });
            
            if (activityMap.length === 0) {
                saveStoreActivity();
            } else if (activityMap.length < 4) {                            
                if (activityNotRegistered === undefined) {
                    saveStoreActivity();
                }
            } else if (activity.length === 4) {
                const lastActivity = activity.sort((a,b) => {
                    return Date.parse(a.createdAt) - Date.parse(b.createdAt);
                })
                if (activityNotRegistered === undefined) {
                    UpdateActivity(lastActivity[0]);
                    saveStoreActivity();
                }                
            }
        }
    }, [activityDone])

    useEffect(() => {
        if (data.length === 0 && !isloading) {
            navigate('/Stores');
            toast.error("No se pudo obtener informacion de esta tienda", {
                toastId: "Error"
            });
            return;
        }
    }, [isloading]);

    const handleClickRating = (rate) => {
        postRating(rate);
        toast.info("Clasificacion de tienda realizada");
    };

    if(!isloading && data.length !== 0){
        const banner = data[0].stores[0].image_user.findIndex(image => image.id_image_type.category === "Banner");
        
        const StoreImageMap = data.map(data => {            
            return <StoreSphere key={data.stores[0]._id} extraClass="small" Store={data.stores[0]}/>;
        });
        const ratingIndex = ratingData.findIndex(rating => rating.client === useAuth().user?._id);
        
        return (
            <div className={ classes["Store"] }>
                <div className={ classes["Store-Header"] }>
                    <div className={ classes["Store-Logo"] }>
                        { StoreImageMap }                        
                    </div>
                    <div className={ classes["Store-Banner"] }>
                        {banner === -1 ? "" : <img src={banner !== -1 ? data[0].stores[0].image_user[banner].imageUrl : ""} alt={`${Store} Banner`} />}                        
                        <div>
                            <h3>{ data[0].stores[0].username }</h3>
                            {
                                useAuth().role === "Client" &&
                                <Rating
                                    size={25}
                                    onClick={handleClickRating}
                                    initialValue={ratingIndex !== -1 ? ratingData[ratingIndex].rating.$numberDecimal : 0}
                                    readonly={ratingIndex === -1 ? false : true}
                                    emptyColor="#2B4D71"
                                    fillColor="#5A7BA0"
                                />
                            }                            
                        </div>  
                        <Rating
                            size={25}
                            readonly={true}
                            initialValue={!isNaN(ratingValue) ? ratingValue : 0}
                            emptyColor="#2B4D71"
                        />                      
                    </div>
                </div>
                { outlet ? <Outlet/> : 
                    <Collections id={id} Store={Store}/>
                }
            </div>
        );
    }
    return (
        <Spinner isloading={isloading}/>
    )
}

export default Store;