import LoginForm from '../../components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../core/AuthRoleUser';

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (useAuth().role !== "") {
            navigate('/');
        }
    }, []);

    return (
        <LoginForm />
    );
}

export default Login;