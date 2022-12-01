import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem('dataStorage')) || {role: ""};
    return user;
}

const ProtectedRoutes = () => {
    const outletContext = useOutletContext();
    const isAuth = useAuth();
    return isAuth.role !== "" ? <Outlet context={outletContext}/> : <Navigate to="/Login"/> ;
}

export {ProtectedRoutes, useAuth};

