import { ToastContainer, toast } from 'react-toastify';
import classes from './RegisterForm.module.scss';
import image from './../../assets/stock_image.jpeg';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import validator from "validator"; //yarn add react-bootstrap bootstrap validator

const RegisterFormStep2 = (props) => {
    const history = useNavigate();
    const { values, handleInputChange, handleChange, handleClientChange, state, prevStep } = props;

    return (
        <main>
            <ToastContainer/>
            <div className={classes["Form"]}>
                <div className={classes["inputs"]}>
                    <form className={classes["form-fields"]} onSubmit={handleChange}>
                        <h2 className={classes["title"]}>Cliente - Crear cuenta</h2>

                        <div className={ classes["side-inputs"] }>
                            <div>
                                <label className={classes["label"]}>F. Nacimiento</label>
                                <div className={ classes["side-input-text"] }>
                                    <input type="date" name="datebirth" placeholder="mm/dd/yyyy" className={classes["input"]}
                                    onChange={handleInputChange}
                                    onInput={handleClientChange('datebirth')}
                                    defaultValue={values.datebirth}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={classes["label"]}>Gender</label>
                                <div className={ classes["side-input-text"] }>
                                        <select 
                                        name="gender" 
                                        className={classes["select-menu"]}
                                        required
                                        onInput={handleClientChange('gender')}
                                        onChange={handleInputChange}>
                                            <option value=""></option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                        <span><MdKeyboardArrowDown className={ classes["arrow"] }/></span>
                                </div>
                            </div>
                        </div>

                        <label className={classes["label"]}>Contraseña</label>
                        <input type="password" name="password" placeholder="Mínimo 8 caracteres" className={classes["input"]}
                        onChange={handleInputChange}
                        onInput={handleClientChange('password')}
                        autoComplete="on"
                        defaultValue={values.password}
                        />

                        <label className={classes["label"]}>Repita la contraseña</label>
                        <input type="password" name="confirmPassword" placeholder="Mínimo 8 caracteres" className={classes["input"]}
                        onChange={handleInputChange}
                        onInput={handleClientChange('confirmPassword')}
                        autoComplete="on"
                        defaultValue={values.confirmPassword}
                        />
                    
                        <div className={classes["buttons-container"]}>
                            <input type="submit" value="REGRESAR" className={classes["submit-button"]} onClick={prevStep}
                            />
                            
                            <input 
                            type="submit" 
                            value="CONTINUAR" 
                            className={classes["submit-button"]}
                            onClick={() => {
                                if (validator.isEmpty(state.datebirth)
                                || validator.isEmpty(state.gender)
                                || validator.isEmpty(state.password)
                                || validator.isEmpty(state.confirmPassword)) {
                                    toast.error("¡Complete los campos!");
                                } else if (state.password != state.confirmPassword) {
                                    toast.warning("La contraseña no es igual");
                                } else if (validator.isLength(state.password, 0, 4) || validator.isLength(state.confirmPassword, 0, 4)) {
                                    toast.warning("La contraseña debe tener como mínimo 8 caracteres");
                                } else {
                                    toast.success("¡Usuario creado con éxito!");
                                    setTimeout(() => {history("/Login")}, 3000);
                                }
                            }}
                            />
                        </div>

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
                    <div className={classes["logo-container"]}>
                        <img src={logo} alt="logo" className={classes["logo-image"]}/>
                    </div>
                    <div className={classes["contenedor"]}>
                        <img src={image} alt="logo" className={classes["image"]}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RegisterFormStep2;