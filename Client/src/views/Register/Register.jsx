import RegisterForm from './../../components/RegisterForm/RegisterForm';
import RegisterFormStep2 from '../../components/RegisterForm/RegisterFormStep2';
import SelectRole from '../../components/RegisterForm/SelectRole';
import StoreRegisterForm from '../../components/RegisterForm/StoreRegisterForm';
import React, { useState, useEffect } from 'react';
import { useAuth } from './../../core/AuthRoleUser';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [state, setState] = useState({
        step: 1,
        username: "",
        name: "",
        lastname: "",
        email: "",
        datebirth: "",
        gender: "",
        password: "",
        confirmPassword: ""
    });

    const [store, setStore] = useState({
        username: "",
        email: "",
        category: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {

        setState({
          ...state,
          [e.target.name] : e.target.value
        })
      }

    const handleInputChangeVendor = (e) => {

    setStore({
        ...store,
        [e.target.name] : e.target.value
    })
    }
      
    
       // Handle fields change
    const handleChange = (e) => { 
        e.preventDefault(); 
        const { username, name, lastname, email, datebirth, gender, password, confirmPassword} = state;

        fetch("https://tienduki.up.railway.app/api/auth/signup/client", {
            method:"POST",
            crossDomain:true,
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
                username, 
                name, 
                lastname, 
                email, 
                datebirth, 
                gender, 
                password
            }),
            }).then((res) => res.json())
                .then((data) => {
                    navigate('/Login');                    
            })
    }

    const handleChangeVendor = (e) => { 
        e.preventDefault(); 
        const { username, email, category, password } = store;

        fetch("https://tienduki.up.railway.app/api/auth/signup/ventor", {
            method:"POST",
            crossDomain:true,
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
                username, 
                email, 
                category, 
                password
            }),
            }).then((res) => res.json())
                .then((data) => {
            })
    }

     // Handle client fields change
     const handleClientChange = (input) => (e) => {
        state[input] = e.target.value;
    }

    // Handle store fields change
    const handleStoreChange = (input) => (e) => {
        store[input] = e.target.value;
    }

    const [step, setStep] = useState(1);
    const {username, name, lastname, email, birthdate, gender, password, confirmPassword} = state;
    const values = {username, name, lastname, email, birthdate, gender, password, confirmPassword};

    // Next step
    const nextStep = () => {
        setStep(step + 1);
    }

    // Previous step
    const prevStep = () => {
        setStep(step - 1);
    }

    // Plus three steps
    const threeSteps = () => {
        setStep(step + 3);
    }

    useEffect(() => {
        if (useAuth().role !== "") {
            navigate('/');
        }
    }, [])


    switch(step) {
        case 1:
            return (
                <SelectRole 
                    nextStep={nextStep}
                    threeSteps={threeSteps}
                />
            )
        case 2:
            return (
                <RegisterForm 
                    nextStep={nextStep}
                    handleInputChange={handleInputChange}
                    handleChange={handleChange}
                    values={values}
                    state={state}
                    handleClientChange={handleClientChange}
                />
            )
        case 3:
            return (
                <RegisterFormStep2 
                    prevStep={prevStep}
                    handleInputChange={handleInputChange}
                    handleChange={handleChange}
                    values={values}
                    state={state}
                    handleClientChange={handleClientChange}
                />
            )
        case 4:
            return (
                <StoreRegisterForm 
                    nextStep={nextStep}
                    values={values}
                    store={store}
                    handleChangeVendor={handleChangeVendor}
                    handleStoreChange={handleStoreChange}
                    handleInputChangeVendor={handleInputChangeVendor}
                />
            )
    }
}

export default Register;