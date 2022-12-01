import classes from './Configuration.module.scss';

import Tags from '../../../components/Tags/Tags';
import { useAuth } from './../../../core/AuthRoleUser';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

const Configuration = () => {
    const [tags, setTags] = useState([]);
    const [email, setEmail] = useState("");
    const [social, setSocial] = useState("");
    const [input, setInput] = useState("");
    const [verified, setVerified] = useState(false);
    const [selected, setSelected] = useState({selected: ""});
    const [editing, setEditing] = useState(false);
    const [editingText, setEditingText] = useState("Editar");
    const [password, setPassword] = useState("");
    const [newPassWord, setNewPassword] = useState("");
    const [newPassWordConfirm, setNewPassWordConfirm] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541");
    const [imageId, setImageId] = useState("");
    const outletContext = useOutletContext();
    const inputref = useRef(null);
    const passwordRef = useRef(null);
    const inputConfirmref = useRef(null); 
    const imageInput = useRef(null);
    const [formData, setFormData] = useState("");

    const addTagPost = (input, social) => {
        fetch(`https://tienduki.up.railway.app/api/social/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    url: input,
                    id_user: useAuth().user._id,
                    id_social_media: social
                }
            ),
        }).then(
            (response) => response.json()
        ).then((data) => {            
            setTags([...tags, {social:social,url:input, id: data._id}]); 
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }
    
    const startEditing = (e) => {
        if (!editing) {
            setEditing(true);
            setEditingText("Cancelar");
            return;
        }
        setEditingText("Editar");
        setEditing(false);
        setInput("");
        setSocial("");
        setSelected({selected: ""});
    }

    const removeTags = (indextToRemove, idToRemove) => {
        fetch(`https://tienduki.up.railway.app/api/social/${idToRemove}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    url: input,
                    id_user: useAuth().user._id,
                    id_social_media: social
                }
            ),
        }).then(
            (response) => response.json()
        ).then((data) => {
            toast.success(`Red social eliminada`);
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        });

        setTags(tags.filter((_, index) => index !== indextToRemove));
    };

    const urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
        return regex.test(URL);
    };

    const changeSocial = (e) => {
        setSelected({selected: e.target.value});
        setSocial(e.target.value);
    };

    const changeInput = (e) => {
        setInput(e.target.value);
    };

    const changeInputPassword = (e) => {
        if (inputref.current.contains(e.target)) {
            setNewPassword(e.target.value);
        }else if (inputConfirmref.current.contains(e.target)) {
            setNewPassWordConfirm(e.target.value)
        }else if (passwordRef.current.contains(e.target)) {
            setPassword(e.target.value);
        }
    }

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    }

    const saveChangesFetch = (body) => {
        fetch(`https://tienduki.up.railway.app/api/user/${outletContext._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(
            (response) => response.json()
        ).then((data) => {             
        }).catch((error) => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const verifyPassword = async (body) => {
        const get = await fetch("https://tienduki.up.railway.app/api/auth/verify/", {
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
                identifier: useAuth().user._id,
                password: password
            }),
        }).then((res) => res.json())
        .then((data) => {
            if (data.status == "ok") {
                setVerified(prev => !prev);
                toast.success("Contraseña actualizada correctamente");
                return true;                
            }
            throw new Error("La contraseña actual es incorrecta");         
        }).catch((error) => {
            toast.error(error, {
                toastId: "Error"
            });
            return false;
        })
        return get;
    }

    const changeImage = () => {
        imageInput.current.click();
    };

    const handleImageChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }

        const formData = new FormData();
        formData.append("upload_preset", "bugtracker1");
        formData.append("file", fileObj);
        setFormData(formData);
    
        e.target.value = null;
        const objectUrl = URL.createObjectURL(fileObj);
        setImagePrev(image);
        setImage(objectUrl);
    }

    const submitProfileImage = async () => {    
        // Se sube la imagen a cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/kike/upload?upload_preset=pdem1alz",
          {
            body: formData,
            method: "POST",
          }
        );
        
        // Guando la informacion de la imagen subida
        const imagenSubida = await response.json();
        
        if (imagePrev !== "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541") {
            fetch(`https://tienduki.up.railway.app/api/image/${imageId}`, {
                method: "PUT",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Acces-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    imageUrl: imagenSubida.url,
                }),
            })
        }else {
            fetch("https://tienduki.up.railway.app/api/image/", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id_user: useAuth().user._id,
                image: imagenSubida.url,
                id_image_type: "637c756b51caf2f6a574fb77"
            }),
        })
        }    
    };

    const saveChanges = async() => {
        let body = {};
               
        body = {
            email: email
        }

        if (newPassWord !== "" && newPassWordConfirm !== "") {
            if (newPassWord === newPassWordConfirm) {
                if (await verifyPassword()) {
                    body = {
                        email: email,
                        hashedPassword: newPassWord
                    }
                }else {
                    toast.error("La contraseña actual es incorrecta", {
                        toastId: "Error"
                    });
                    return;
                }
            }else{
                toast.warn("Asegurese que la nueva contraseña y su confirmación sean iguales");
                return;
            }            
        } 

        saveChangesFetch(body)
        if (imagePrev !== "") {
            submitProfileImage();
        }        
        setEditing(false);        
        setEditingText("Editar");
        toast.success("Cambios guardados correctamente");
        setInput("");
        setSocial("");
        setSelected({selected: ""}); 
    }    

    const addTags = () => {
        if (tags.length < 5) {
            if (input !== "" && urlPatternValidation(input)) {
                if (selected.selected === "") {
                    toast.warn("Debes seleccionar una red social.");
                    return;
                }                
                setInput("");
                setSelected({selected: ""});
                setSocial("");
                addTagPost(input, social);
                toast.success("Red social añadida correctamente");                
            }else {
                toast.warn("Debes ingresar la url de la red social.");
            }
            return;
        }
        toast.warn("El limite de redes sociales que puedes agregar son 5.");
    };

    useEffect(() => {
        const socialsMap = outletContext.socials.map(social => {
            return {social:social.id_social_media._id, url:social.url, id:social._id};
        })
        setTags(socialsMap);
        const imageIndex = outletContext.image_user.findIndex(image => image.id_image_type.category === "Profile");

        if (imageIndex !== -1) {
            setImage(outletContext.image_user[imageIndex].imageUrl);
            setImageId(outletContext.image_user[imageIndex]._id);
        }

        setEmail(outletContext.email);
    }, [outletContext]);
    
    return (
        <div className={ classes["Configuration"] }>
            <div className={ classes["Profile-header"] }>
                <img src={image} className={editing ? classes["imageEdit"] : undefined} onClick={editing ? changeImage : undefined} alt="" />
                <input ref={imageInput} onChange={handleImageChange} type="file" accept="image/*"  />
                <div className={ classes["Profile-info"] }>
                    <h2>@{outletContext.username}</h2>
                    <input type="text" className={editing ? classes["active-input"] : undefined} onChange={handleInputChange} defaultValue={outletContext.email} readOnly={editing ? false : true}/>
                </div>
            </div>
            <div className={ classes["Profile-body"] }>
                <div className={ classes["Personal-info"] }>
                    <h3>Informacion Personal</h3>
                    <hr className={ classes["Line"] } />
                </div>                
                
                {
                    editing ?
                    <>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Contraseña
                            </h4>                    
                            <input ref={passwordRef} type="password" onChange={changeInputPassword} autoComplete={"off"} className={editing ? classes["active-input"] : undefined} readOnly={editing ? false : true} placeholder="••••••••••••"/>
                        </div>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Nueva contraseña
                            </h4>                    
                            <input ref={inputref} type="password" onChange={changeInputPassword} className={editing ? classes["active-input"] : undefined} readOnly={editing ? false : true} placeholder="••••••••••••"/>
                        </div>   
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Confirmar contraseña
                            </h4>                    
                            <input ref={inputConfirmref} type="password" onChange={changeInputPassword} className={editing ? classes["active-input"] : undefined} readOnly={editing ? false : true} placeholder="••••••••••••"/>
                        </div>   
                    </>
                    :
                    <>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Nombre
                            </h4>
                            <span>
                                { outletContext.name } { outletContext.lastname }
                            </span>
                        </div>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Fecha de nacimiento
                            </h4>
                            <span>
                            {new Date(outletContext.datebirth).toISOString().split('T')[0]}
                            </span>
                        </div>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Sexo
                            </h4>
                            <span>
                                {outletContext.gender}
                            </span>
                        </div>
                    </>
                }
            </div>
            <div className={ classes["Profile-footer"] }>
                <div className={ classes["Social-media"] }>
                    <h3>Redes sociales</h3>
                    <hr className={ classes["Line"] } />
                </div>
                <div className={ classes["Social-media-container"] }>
                    <Tags addTags={addTags} tags={tags} input={input} removeTags={removeTags} changeSocial={changeSocial} changeInput={changeInput} selected={selected} editing={editing}/>
                </div>
            </div>

            <div className={classes["Buttons"]}>
                {editing && 
                    <button className={`${classes["btn"]} ${classes["btn-primary"]}`} disabled={editing ? false : true} onClick={() => {
                        if(newPassWord.length !== 0 && (newPassWord.length < 5 || newPassWord.length > 12)){
                            toast.warn("La nueva contraseña debe ser de entre 5 a 12 caracteres");
                            return;
                        }
                        saveChanges()
                    }}>Guardar Cambios</button>}
                <button className={`${classes["btn"]} ${classes["btn-secondary"]}`} onClick={startEditing}>{editingText}</button>
            </div>
            
        </div>
    )    
}

export default Configuration;