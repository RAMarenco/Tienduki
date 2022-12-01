import { ToastContainer, toast } from 'react-toastify';
import classes from './StoreRegisterForm.module.scss';
import image from '../../assets/stock_image.jpeg';
import { useNavigate } from 'react-router-dom';
import validator from "validator"; //yarn add react-bootstrap bootstrap validator

const StoreRegisterForm = (props) => {
    const { store, handleStoreChange, handleChangeVendor, handleInputChangeVendor } = props;
    const history = useNavigate();
    
    return (
        <main>
            <ToastContainer/>
            <div className={classes["Form"]}>
                <div className={classes["inputs"]}>
                    <form className={classes["form-fields"]} onSubmit={handleChangeVendor}>
                        <h2 className={classes["title"]}>Tienda - Crear cuenta</h2>

                        <label className={classes["label"]}>Usuario</label>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder="Ingrese su usuario" 
                        className={classes["input"]}
                        onChange={handleInputChangeVendor}
                        onInput={handleStoreChange('username')}
                        defaultValue={store.username}
                        />

                        <label className={classes["label"]}>Correo electrónico</label>
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="alguien@ejemplo.com" 
                        className={classes["input"]}
                        onChange={handleInputChangeVendor}
                        onInput={handleStoreChange('email')}
                        defaultValue={store.email}
                        />

                        <label className={classes["label"]}>Categoría</label>
                            <select 
                            name="category" 
                            className={classes["select-menu"]}
                            onInput={handleStoreChange('category')}
                            onChange={handleInputChangeVendor}
                            required>
                                <option value=""></option>
                                <option value="Bisuteria">Bisutería</option>    //! Valores quemados
                                <option value="Artesania">Artesanía</option>
                            </select>

                        <label className={classes["label"]}>Contraseña</label>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="Mínimo 8 caracteres" 
                        className={classes["input"]}
                        onChange={handleInputChangeVendor}
                        onInput={handleStoreChange('password')}
                        defaultValue={store.password}
                        />

                        <label className={classes["label"]}>Repita la contraseña</label>
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Mínimo 8 caracteres" 
                        className={classes["input"]}
                        onChange={handleInputChangeVendor}
                        onInput={handleStoreChange('confirmPassword')}
                        defaultValue={store.confirmPassword}
                        />
                    
                        <input 
                        type="submit" 
                        value="CONTINUAR" 
                        className={classes["submit-button"]} 
                        onClick={() => {
                            if (validator.isEmpty(store.username)
                            || validator.isEmpty(store.email)
                            || validator.isEmpty(store.password)
                            || validator.isEmpty(store.confirmPassword)
                            || validator.isEmpty(store.category)) {
                                toast.error("¡Complete los campos!");
                            } else if (!validator.isEmail(store.email)) {
                                toast.warning("Ingrese un correo válido");
                            } else if (store.password != store.confirmPassword) {
                                toast.warning("La contraseña no es igual");
                            } else if (validator.isLength(store.password, 0, 4) || validator.isLength(store.confirmPassword, 0, 4)) {
                                toast.warning("La contraseña debe tener como mínimo 8 caracteres");
                            } else {
                                toast.success("¡Usuario creado con éxito!");
                                setTimeout(() => {history("/Login")}, 3000);
                            }
                        }}/>

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

export default StoreRegisterForm