import classes from './User.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from './../../../components/Spinner/Spinner';

import { IoArrowUndo } from 'react-icons/io5';

const User = () => {
    const { id } = useParams();
    const [ userInfo, setUserInfo ] = useState(
        {
            "username": "",
            "name": "",
            "lastname": "",
            "datebirth": "",
            "gender": "",
            "email": "",
            "id_rol": "637d209b43311e1bfa18b7b0",
            "password": ""
        }
    );
    const [ user, setUser ] = useState([]);
    const [ isloading, setIsLoading ] = useState(true);
    const navigate = useNavigate();
    const [vendor, setVendor] = useState(false);

    const GetUser = () => {
        setIsLoading(true);
        fetch(`https://tienduki.up.railway.app/api/user/${id}`)
        .then(
            response => {
                if (response.ok) {
                    return response.json().then(data => {
                        setUser(data);
                        setUserInfo({
                            "username": data.username,
                            "name": data.name,
                            "lastname": data.lastname,
                            "datebirth": data.datebirth,
                            "gender": data.gender,
                            "email": data.email,
                            "id_rol": data.id_rol_id,
                        });
                        toast.success("Datos cargados satisfactoriamente.", {
                            toastId: "Exito"
                        });
                        setIsLoading(false);
                    })
                }
                throw new Error('Something went wrong');
            }
        ).catch((error) => {
            toast.error("No se pudieron cargar los datos del usuario", {
                toastId: "Error"
            });
            navigate('/Users');
            setIsLoading(false);
            return;
        })
    }

    useEffect(() => {        
        if (id !== undefined) {
            GetUser();
            return;
        }
        setIsLoading(false);
    }, []);

    const handleAddClickNavigate = (e) => {
        navigate('/Users');
    }

    const verifyUserInfo = () => {
        return Object.values(userInfo).every(x => x !== '');        
    }

    const handleChangeInput = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        if (targetValue === "637d209f43311e1bfa18b7b2") {
            setVendor(true);
        }
        setUserInfo(userInfo => ({
            ...userInfo,
            [targetName]: targetValue
        }));

        verifyUserInfo();
    }    

    const saveUser = () => {
        if (verifyUserInfo()){
            fetch(`https://tienduki.up.railway.app/api/user/${id ? id : ""}`, {
                method: id ? 'PUT' : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    userInfo
                ),
            }).then(
                (response) => response.json()
            ).then((data) => {
                if(id){            
                    toast.info(`Usuario Actualizado!`);
                }else {
                    toast.info(`Usuario agregado!`);
                }
                navigate('/Users');
            }).catch(() => {
                toast.error(`No se pudo realizar la accion`);
            })
        }        
    }

    if (!isloading) {
        return (
            <div className={ classes["User"] }>
                <div className={ classes["Users-options-main-header"] }>
                        <h4>{id ? "Editar Usuario" : "Agregar Usuario"}</h4>
                        <div className={ classes["Users-options-main-actions"] }>
                            
                            <button className={ classes["return"] } onClick={handleAddClickNavigate}><IoArrowUndo/></button>
                        </div>
                </div>
                <div className={ classes["Card"] }>
                    <div className={ classes["Card-input"] }>
                        <div className={ classes["input"] }>
                            <h3>Nombre</h3>
                            <input type="text" onChange={handleChangeInput} name="name" defaultValue={id ? user.name : ""} placeholder="Nombre"/>
                        </div>
                        <div className={ classes["input"] }>
                            <h3>Apellido</h3>
                            <input type="text" onChange={handleChangeInput} name="lastname" defaultValue={id ? user.lastname : ""} placeholder="Apellido"/>
                        </div>
                        <div className={ classes["input"] }>
                            <h3>Usuario</h3>
                            <input type="text" onChange={handleChangeInput} name="username" defaultValue={id ? user.username : ""} placeholder="Usuario" readOnly={id ? true : false}/>
                        </div>
                        <div className={ classes["input"] }>
                            <h3>Fecha de nacimiento</h3>
                            <input type="date" onChange={handleChangeInput} name="datebirth" defaultValue={id ? new Date(user.datebirth).toISOString().split('T')[0] : ""} />
                        </div>
                        <div className={ classes["input"] }>
                            <h3>Género</h3>
                            <select onChange={handleChangeInput} name="gender" defaultValue={id ? user.gender : "" } disabled={id ? true : false}>
                                <option>Género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>                        
                        </div>
                        <div className={ classes["input"] }>
                            <h3>Correo electrónico</h3>
                            <input onChange={handleChangeInput} name="email" type="email" defaultValue={id ? user.email : ""} placeholder="Ej. correoEjemplo@gmail.com"/>
                        </div>
                        {!id &&
                            <div className={ classes["input"] }>
                                <h3>Contraseña</h3>
                                <input onChange={handleChangeInput} name="password" type="password" placeholder="••••••••••••"/>
                            </div>
                        }
                        <div className={ classes["input"] }>
                            <h3>Rol</h3>
                            <select onChange={handleChangeInput} name="id_rol" defaultValue={id ? user.id_rol._id : "637d209b43311e1bfa18b7b0"} disabled={id ? true : false}>
                                <option>Rol</option>
                                <option value="637d209b43311e1bfa18b7b0">Cliente</option>
                                <option value="637d209f43311e1bfa18b7b2">Vendedor</option>
                            </select>
                        </div>
                        {
                            vendor && 
                            <div className={ classes["input"] }>
                                <h3>Categoría</h3>
                                <select onChange={handleChangeInput} name="category">
                                    <option>Categoria</option>
                                    <option value="Bisuteria">Bisuteria</option>
                                    <option value="Postres">Postres</option>
                                    <option value="Artesania">Artesania</option>
                                    <option value="Transporte">Transporte</option>
                                </select>
                            </div>
                        }
                    </div>
                    <button className={ `${classes["btn"]} ${classes["btn-primary"]}` } onClick={saveUser} disabled={!verifyUserInfo()}>
                        {id ? "Editar Usuario" : "Agregar Usuario"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Spinner isloading={isloading}/>
    )
}

export default User;