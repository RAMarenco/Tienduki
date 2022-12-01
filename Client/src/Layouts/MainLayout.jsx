import classes from './MainLayout.module.scss';

import { useRef, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import menuData from './../core/containers/Menu.jsx';
import Spinner from './../components/Spinner/Spinner';

import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import SideMenu from '../components/Header/NavBarMenu/SideMenu/SideMenu';

const MainLayout = ({Page = ""}) => {

    const refMainWrapper = useRef(null);
    
    const [isOpen, setIsOpen] = useState(false);

    const handleClickMenu = (e) => {        
        if (isOpen === false) {
            setIsOpen(true);
            return;
        }

        if (refMainWrapper.current && refMainWrapper.current.contains(e.target)){
            setIsOpen(false);
            return;
        }
        setIsOpen(false);
    }

    const customId = "noAuthToast";

    const handleNoAuthMessage = () => {        
        toast.warn("No tienes acceso a esta informacion", {
            toastId: customId
        });
    }
        
    return (
        <>
            <SideMenu menuElements={ menuData } isOpen={isOpen}/>
            <div ref={refMainWrapper} className={ `${classes['Main-Wrapper']} ${isOpen ? classes["Main-Wrapper-black"] : ""}` } onClick={handleClickMenu} >
            </div>  
            <Header menuElements={ menuData } onClickMenu={handleClickMenu}/>
            <main className={classes['main-layout']}>
                <Outlet context={handleNoAuthMessage}/>        
            </main>
            <Footer/>
            <ToastContainer autoClose={3000} pauseOnFocusLoss={false} closeButton={false} pauseOnHover={false} position="bottom-right"/>
        </>
    );
}

export default MainLayout;