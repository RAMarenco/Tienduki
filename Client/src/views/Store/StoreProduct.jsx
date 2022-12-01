import classes from './StoreProduct.module.scss'
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../core/AuthRoleUser';
import { toast } from 'react-toastify';
import { IoArrowUndo } from 'react-icons/io5';
import logo from './../../assets/logo.png';
import { MdUpload } from "react-icons/md";

const StoreProduct = () => {
    const navigate = useNavigate();
    const inputFile = useRef(null) ;
    const [imageInputTag, setImageInputTag] = useState([]);

    const {id} = useParams();

    const handleReturnClick = () => {
       navigate('/Store');
    };

    const uploadImage = () => {
        inputFile.current.click();
    };

    const [storeProductInfo, setStoreProductInfo] = useState(
        {
            "name": "",
            "description": "",
            "price": 0,
            "_id_product_collection": "",
            "_id_store": useAuth().user._id
        }
    )

    /* const [a, aa] = useState(
        {
        "name": "",
        "description": "",
        "price": 0,
        "_id_product_collection": "",
        "_id_store": useAuth().user._id
        }
    ); */

    const [storeProduct, setStoreProduct] = useState([]);
    const [productCollection, setProductCollection] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(true); 
    const [getId, setId] = useState("");
    
    const [images, setImages] = useState([]);

    const submitImage = async (formData, id) => {
        const response = await fetch(
            "https://api.cloudinary.com/v1_1/kike/upload?upload_preset=pdem1alz",
            {
              body: formData,
              method: "POST",
            }
        );
        const imagenSubida = await response.json(); 

        fetch("https://tienduki.up.railway.app/api/productImage/", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id_store: useAuth().user._id,
                imageUrl: imagenSubida.url,
                id_product: id,
            }),
        })
    }

    let cont = 0;

    const imageInput = (e) => {
        setImages([...e.target.files]);
        const imageFromInput = [...e.target.files];        
        imageFromInput.forEach(image => {
            const objectUrl = URL.createObjectURL(image);            
            setImageInputTag(prev => [...prev, objectUrl]);
        })        
    }

    const handleInputChange = (e) => {
        setStoreProductInfo({
            ...storeProductInfo,
            [e.target.name]: e.target.value
        });
    }

    // Adding a product
    const addProduct = () => {
        if (storeProductInfo._id_product_collection !== "") {
            fetch(`https://tienduki.up.railway.app/api/storeProduct/${id ? id : ""}`, {
                method: id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ( storeProductInfo ),
            }).then (
                response => response.json(),
            ).then((data) => {
                images.forEach(file => {
                    const formData = new FormData();
                    formData.append("upload_preset", "bugtracker1");
                    formData.append("file", file);
                    submitImage(formData, data._id);                    
                    
                    toast.info(`${id ? "Producto modificado correctamente" : "Producto agregado correctamente"}`, {toastId: "Info"});
                });
                navigate("/Store");                
            })
        } else {
            toast.warn("Asegurese de llenar todos la información.", {toastId: "Warn"})
        }
    }
    
    // Editing a product
    const getProduct = () => {
        setIsLoading(true);
        fetch(`https://tienduki.up.railway.app/api/storeProduct/id/${id}`)
        .then (
            response => {
                if (response.ok) {
                    return response.json().then(data => {
                        setStoreProduct(data);
                        setStoreProductInfo({
                            "name": data.name,
                            "description": data.description,
                            "price": data.price.$numberDecimal,
                            "_id_product_collection": data._id_product_collection,
                            "image_product": data.image_product
                        })
                        setIsLoading(false);                        
                        
                        toast.success("Datos cargados satisfactoriamente.", {
                            toastId: "Exito"
                        });
                    })
                }
                throw new Error('Something went wrong')
            }
        )
    }

    // get all collections from user (vendor)
    const getCollections = () => {
        setLoading(true);
        fetch(`https://tienduki.up.railway.app/api/productCollection/${useAuth().user._id}`)
        .then (
            response => {
                if (response.ok) {
                    return response.json().then(data => {
                        setProductCollection(data);
                        setLoading(false);
                        toast.success("Datos cargados satisfactoriamente.", {
                            toastId: "Exito"
                        });
                    })
                }
                throw new Error('Something went wrong')
            }
        )
    }

    useEffect(() => {        
        if (id !== undefined) {
            getProduct();
            //getProductV2()
            return;
        }
        //getProduct()
        
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getCollections();        
    }, [isLoading])

    useEffect(() => {
        if (storeProduct.length !== 0) {
            storeProduct.image_product.forEach(dataImages => {
                setImageInputTag(prev => [...prev, dataImages.imageUrl]);
            })
        }        
    }, [loading]);
    
    if(!loading) {       
        return ( 
            <div className={ classes["StoreProducts"] }>
                    <div className={ classes["Product-container"] }>
                        <div className={ classes["Product-options-main-header"] }>
                            <h4>{id ? "Editar producto" : "Agregar producto"}</h4>
                            <div className={ classes["Product-options-main-actions"] }>
                                <button className={ classes["return"] } onClick={handleReturnClick}> <IoArrowUndo /> </button>
                            </div>
                        </div>
                        <div className={ classes["AddProduct-container"] }>
                            <div>
                                <label>Nombre</label>
                                <input type="text" name="name" placeholder="Nombre del producto" onChange={handleInputChange} defaultValue={id ? storeProduct.name : ""}/>
    
                                <label>Descripción</label>
                                <textarea name="description" cols="30" rows="3" maxLength="400" placeholder="Descripción del producto" onChange={handleInputChange} defaultValue={id ? storeProduct.description : ""} ></textarea>
                            </div>
                            <div>
                                <label>Colección</label>
                                <select name="_id_product_collection" onInput={handleInputChange} defaultValue={id ? storeProduct._id_product_collection._id : "" } required>
                                    <option>Selecciona una opcion</option>
                                    {
                                    productCollection.map((collection) => {
                                        return (
                                                <option key={collection._id} value={collection._id}> {collection.collectionName} </option>
                                        )
                                    })
                                    }
                                </select>
    
                                <div className={ classes["price-image-container"] }>
                                    <div>
                                        <label>Precio</label>
                                        <div className={ classes["wrapper"] }>
                                            <input type="number" name="price" defaultValue={id ? storeProduct.price.$numberDecimal : ""} onChange={handleInputChange} placeholder="Precio" min="0.01" max="999.99"/>
                                            <span>$</span>
                                        </div>
                                    </div>
    
                                    <div>
                                        <label>Imágenes</label>
                                        <div className={ classes["wrapper-two"] }>
                                            <input type="text" placeholder="Subir imagen" onClick={uploadImage} readOnly/>
                                            <span> <MdUpload/> </span>
                                        </div>
                                    </div>
                                    <input ref={inputFile} onChange={imageInput} type="file" accept="image/*" multiple/>
                                </div>
                                <button onClick={addProduct}> {id ? "EDITAR" : "AGREGAR"} </button>
                            </div>
                            <div>
                                <h4>Imágenes del producto</h4>
                                <hr />
                                <div className={ classes["images"] }>
                                    {imageInputTag.map(img => {
                                        cont++;
                                        return (
                                            <img key={`${img} ${cont}`} src={img} alt={img}/>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default StoreProduct;