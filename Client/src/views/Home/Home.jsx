import classes from './Home.module.scss';

import Slider from './../../components/Slider/Slider';
import Card from '../../components/Card/RecentStoreCard/RecentStoreCard';

import { useAuth } from '../../core/AuthRoleUser';
import { useEffect, useState } from 'react'

const Home = () => {
    const user = useAuth().role;
    const [userData, setUserData] = useState({});
    const [isloading, setIsLoading] = useState(true);

    const getUser = () => {
        fetch(`https://tienduki.up.railway.app/api/user/${useAuth().user._id}`, {
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
                        setIsLoading(false);
                        setUserData(data);                        
                    })
                }
                throw new Error('Something went wrong');
            }
        ).catch((error) => {            
            setIsLoading(false);
        })
    }

    useEffect(() => {
        if (user === 'Admin' || user === 'Vendor') {
            getUser();
            return;
        }
        setIsLoading(false);
    }, [])


    if (!isloading) {
        return (
            <>
                <div className={user === "Client" ? classes["Home"] : `${classes["Home"]} ${classes["one-row"]}`}>
                    {(user === "Client" || user === "") ?  
                        <>
                            <div className={ classes["Slider-Container"] }>
                                <Slider />
                            </div>
    
                            {user === "Client" && 
                                <div className={ classes["Card-Container"] }>
                                    <Card extraclasses={["recent-stores", "StoreSpheres-container"]} type="StoreSphere" />
                                </div>
                            }                        
                        </>
                        :
                        (user === "Vendor") ?
                        <div className={ classes["Full-background"] }>
                            {                        
                                userData.image_user.map(image => {                                    
                                    if (image.id_image_type.category === "Profile") {
                                        return (
                                            <div className={ classes["Logo"] } key={image._id}>
                                                <img src={image.imageUrl} alt="Store Logo" />
                                            </div>
                                        )
                                    }else if (image.id_image_type.category === "Banner") {
                                        return (
                                            <div className={ classes["BackGround"] } key={image._id}>
                                                <img src={image.imageUrl} alt="Store Logo" />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        :
                        user === "Admin" &&
                        <div className={ classes["Full-background"] }>
                            <div className={ classes["Logo"] }>
                                <img src="/src/assets/logo.png" alt="Admin Logo" />
                            </div>
                            <div className={ classes["BackGround"] }>
                                <img src="https://s3.amazonaws.com/cdn.wp.m4ecmx/wp-content/uploads/2015/05/31143018/Qu%C3%A9-es-el-eCommerce-compressor.jpg" alt="Store Logo" />
                            </div>                            
                        </div>
                    }
    
                </div>
            </>
        );
    }
    
}

export default Home;