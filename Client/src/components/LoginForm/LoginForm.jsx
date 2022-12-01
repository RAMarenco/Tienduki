import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import classes from './LoginForm.module.scss';
import image from '../../assets/stock_image.jpeg';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import React from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [logged, setLogged] = useState(false);

  const errors = {
      "user": !user,
      "password": !password
  }

  const hasErrors = () => Object.values(errors).some(error => error);
  
  const [state, setState] = useState({
    identifier: "",
    password: "",
    });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
  
    const { identifier, password } = state;
    fetch("https://tienduki.up.railway.app/api/auth/signin/", {
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type" : "application/json",
        Accept: "application/json",
        "Acces-Control-Allow-Origin": "*",
      },
      body:JSON.stringify({
        identifier,
        password
      }),
    }).then((res) => res.json())
      .then((data) => {

        if (data.status == "ok") {
          window.localStorage.setItem("dataStorage", JSON.stringify(data.data));
          toast.success("Inicio de sesion exitoso!", {
            toastId: "Exito"
          });
          setLogged(true)
          return;
        }
        throw new Error('Something went wrong');
    }).catch((error) => {
      toast.error("Error al intentar iniciar sesion.", {
          toastId: "Error"
      });
    })
  }  

  useEffect(() => {
    if (logged) {
      setTimeout(() => {        
        window.location.href = "/";
      }, 2000);
      return;
    }
  }, [logged])


  return (
      <main>
          <ToastContainer/>
          <div className={classes["Form"]}>
              <div className={classes["inputs"]}>
                  <form className={classes["form-fields"]} onSubmit={handleSubmit}>
                      <h2 className={classes["title"]}>Inicio de sesión</h2>

                      <label className={classes["label"]}>Cuenta</label>
                      <input 
                      type="text" 
                      name="identifier" 
                      placeholder="Ingrese su correo o usuario" 
                      className={classes["input"]}
                      onChange={handleInputChange}
                      onInput={({ target }) => {setUser(target.value)}}/>

                      <label className={classes["label"]}>Contraseña</label>
                      <input 
                      type="password" 
                      name="password" 
                      placeholder="Ingrese su contraseña" 
                      className={classes["input"]} 
                      autoComplete = "on"
                      onChange={handleInputChange}
                      onInput={({ target }) => {setPassword(target.value)}}/>

                      <div className={classes["forgot-pass"]}>
                          <a className={classes["Span"]} onClick = {() => {
                              history("/"); // *! Create forgot password view asking for email and new view to change password
                          }}>
                              ¿Olvidaste la contraseña?
                          </a>
                      </div>
                      
                      <input 
                      type="submit" 
                      value="INGRESAR" 
                      className={classes["submit-button"]} 
                      onClick = {() => {
                          if(hasErrors()){
                              toast.error("¡Complete los campos!");
                          } else {
                              
                          }
                      }} />

                      <hr className={classes["line"]}/>

                      <div className={classes["new-user-div"]}>
                          <span className={classes["Span"]}>¿Eres un nuevo usuario?</span>
                          <a className={classes["linked-text"]} onClick = {() => {
                              history("/Register");
                          }}>
                              Crea una cuenta
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

export default Login;