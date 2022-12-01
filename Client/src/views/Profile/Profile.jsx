import classes from './Profile.module.scss';

import { useState, useRef, useEffect } from 'react';
import { Outlet, useOutlet, Link, useOutletContext, useLocation  } from 'react-router-dom';
import { useAuth } from './../../core/AuthRoleUser';
import { toast } from 'react-toastify';

import { AiFillTwitterSquare, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import { IoArrowUndo } from 'react-icons/io5';
import { HiCog } from 'react-icons/hi';

import ProfileActions from '../../components/Profile/ProfileActions/ProfileActions';
import Spinner from './../../components/Spinner/Spinner';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const outlet = useOutlet();
    const Backgroundwrapper = useRef(null);
    const [isloading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);  
    const location = useLocation();  

    const GetProfile = () => {        
        fetch(`https://tienduki.up.railway.app/api/user/${useAuth().user._id}`)
        .then(
            response => {
                if (response.ok) {
                    return response.json().then(data => {
                        setUser(data);                        
                        setIsLoading(false);
                    })
                }
                throw new Error('Something went wrong');
            }
        ).catch((error) => {
            toast.error("No se pudieron cargar los datos", {
                toastId: "Error"
            });
            setIsLoading(false);
        })
    }

    useEffect(() => {
        GetProfile();
    }, [location.pathname])

    const handleClick = (e) => {        
        if (open === false) {
            setOpen(true);
            return;
        }

        if (Backgroundwrapper.current && Backgroundwrapper.current.contains(e.target)) {
            setOpen(false);
            return;
        }
        setOpen(false);        
    }    

    if (!isloading) {
        const images = user.image_user.findIndex(image => image.id_image_type.category === "Profile");
        return (
            <div className={ classes["Profile"] }>
                <div className={ open ?  `${ classes["Backgroundwrapper"] } ${ classes["Backgroundwrapper-black"] }` : classes["Backgroundwrapper"] } ref={Backgroundwrapper} onClick={handleClick}></div>
                <div className={ classes["Profile-container"] }>
                    <div className={ open ? `${ classes["Profile-SideMenu"] } ${ classes["active"] }` : classes["Profile-SideMenu"]}>
                        <div className={ classes["Main-ProfileActions"] }>
                                <ProfileActions Icon={"RiPencilFill"} Name={"Perfil"} url="/Profile"/>
                                {                                
                                    useAuth().role === "Client" && 
                                    <>
                                        <ProfileActions Icon={"RiHistoryFill"} Name={"Actividad"} url="/Profile/Activity"/>
                                        <ProfileActions Icon={"RiStarSFill"} Name={"Lista de deseos"} url="/Profile/WishList"/>
                                    </>
                                }
                                {useAuth().role !== "Admin" && <ProfileActions Icon={"TbFileInvoice"} Name={"Órdenes"} url="/Profile/Orders"/>}
                                
                        </div>
                        <Link to="./Configuration" className={ classes["configurationLink"] }><HiCog/>Configuración</Link>                    
                    </div>
                    <div className={ classes["Profile-MainContent"] }>
                        { outlet ? 
                            <Outlet context={user}/> : 
                            <>
                                <div className={ classes["Profile-header"] }>
                                    <img src={images !== -1 ? user.image_user[images].imageUrl : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} alt="" />
                                    <div className={ classes["Profile-info"] }>
                                        <h2>@{user.username}</h2>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <div className={ classes["Profile-body"] }>
                                    <div className={ classes["Personal-info"] }>
                                        <h3>Informacion Personal</h3>
                                        <hr className={ classes["Line"] } />
                                    </div>
                                    <div className={ classes["Data-section"] }>
                                        <h4>
                                            Nombre
                                        </h4>
                                        <span>
                                            {user.name} {user.lastname}
                                        </span>
                                    </div>
                                    <div className={ classes["Data-section"] }>
                                        <h4>
                                            Fecha de nacimiento
                                        </h4>
                                        <span>
                                            {new Date(user.datebirth).toISOString().split('T')[0]}
                                        </span>
                                    </div>
                                    <div className={ classes["Data-section"] }>
                                        <h4>
                                            Sexo
                                        </h4>
                                        <span>
                                            {user.gender}
                                        </span>
                                    </div>
                                </div>
                                <div className={ classes["Profile-footer"] }>
                                    <div className={ classes["Social-media"] }>
                                        <h3>Redes sociales</h3>
                                        <hr className={ classes["Line"] } />
                                    </div>
                                    <div className={ classes["Social-media-container"] }>
                                        {
                                            user.socials.map(social => {
                                                return (
                                                    <a href={social.url} key={social._id} className={ classes["Social-media-button"] }>{social.id_social_media.media === "Instagram" ? <AiFillInstagram/> : social.id_social_media.media === "Twitter" ? <AiFillTwitterSquare/> : <AiFillFacebook/>}{social.id_social_media.media}</a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        }
                        <div className={ classes["OpenMenu"]} onClick={handleClick}>
                            <IoArrowUndo/>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }

    return (
        <Spinner isloading={isloading}/>
    )
}

export default Profile;