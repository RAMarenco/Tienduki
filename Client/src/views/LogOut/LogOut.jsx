import { useEffect } from "react";
import { toast } from 'react-toastify';
import Home from "./../Home/Home";

const LogOut = () => {
    localStorage.removeItem('dataStorage');
    useEffect(() => {
        toast.info("Sesion cerrada!", {
            toastId: "Info"
        });
        setTimeout(() => {            
            window.location.href = "/";
        }, 2000)        
    }, []);
}

export default LogOut