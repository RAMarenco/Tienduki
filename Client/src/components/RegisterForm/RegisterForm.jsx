import { ToastContainer, toast } from 'react-toastify';
import classes from './RegisterForm.module.scss';
import image from '../../assets/stock_image.jpeg';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import validator from "validator"; //yarn add react-bootstrap bootstrap validator

const RegisterForm = (props) => {
    const history = useNavigate();
    const { values, handleInputChange, handleChange, handleClientChange, nextStep, state } = props;

        return (
            <main>
                <ToastContainer/>
                <div className={classes["Form"]}>
                    <div className={classes["inputs"]}>
                        <form className={classes["form-fields"]}>
                            <h2 className={classes["title"]}>Cliente - Crear cuenta</h2>
    
                            <label className={classes["label"]}>Usuario</label>
                            <input 
                            type="text" 
                            name="username" 
                            placeholder="Ingrese su usuario" className={classes["input"]}
                            onChange={handleInputChange}
                            onInput={handleClientChange('username')}
                            defaultValue={values.username}
                            />
    
                            <label className={classes["label"]}>Nombre</label>
                            <input 
                            type="text" 
                            name="name" 
                            placeholder="Ingrese su nombre" 
                            className={classes["input"]}
                            onChange={handleInputChange}
                            onInput={handleClientChange('name')}
                            defaultValue={values.name}
                            />
    
                            <label className={classes["label"]}>Apellido</label>
                            <input 
                            type="text" 
                            name="lastname" 
                            placeholder="Ingrese su apellido" 
                            className={classes["input"]}
                            onChange={handleInputChange}
                            onInput={handleClientChange('lastname')}
                            defaultValue={values.lastname}
                            />
    
                            <label className={classes["label"]}>Correo electrónico</label>
                            <input 
                            type="text" 
                            name="email" 
                            placeholder="alguien@ejemplo.com" 
                            className={classes["input"]}
                            onChange={handleInputChange}
                            onInput={handleClientChange('email')}
                            defaultValue={values.email}
                            />
                        
                            <input 
                            value="CONTINUAR" 
                            readOnly
                            className={classes["submit-button"]}
                            onClick={() => {
                                if (validator.isEmpty(state.username)
                                    || validator.isEmpty(state.name)
                                    || validator.isEmpty(state.lastname)
                                    || validator.isEmpty(state.email)
                                ) {
                                    toast.error("¡Complete los campos!");
                                } else if (!validator.isEmail(state.email)) {
                                    toast.warning("Ingrese un correo válido");
                                } else if (validator.isLength(state.username, 0, 4)) { 
                                    toast.error("Usuario: 5 caracteres como mínimo");
                                } else {
                                    nextStep();
                                }
                            }} />
    
                            <hr className={classes["line"]}/>
    
                            <div className={classes["new-user-div"]}>
                                <span className={classes["Span"]}>¿Ya tienes una cuenta?</span>
                                <a className={ classes["linked-text"] } onClick = {() => {
                                    history("/Login");
                                }}>
                                    Inicia sesión
                                </a>
                            </div>
                        </form>
                    </div>
    
                    <div className={classes["logo"]}>
                        <div className={classes["contenedor"]}>
                            <img src={image} alt="logo" className={classes["image"]}/>
                        </div>
                    </div>
                </div>
        </main>
    ) 
}

export default RegisterForm;