import classes from './Product.module.scss';

import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAuth } from '../../../core/AuthRoleUser';
import Spinner from '../../Spinner/Spinner';

const Product = () => {
    const [mainImage, setMainImage] = useState("");
    const [product, setProduct] = useState({})
    const [isloading, setIsLoading] = useState(true);
    const [activityDone, setActivityDone] = useState(false);
    const [activity, setActivity] = useState([]);
    const {id, Store, idProduct} = useParams();
    const navigate = useNavigate();

    const GetProduct = () => {
        setIsLoading(true)
        fetch(`https://tienduki.up.railway.app/api/storeProduct/id/${idProduct}`, {
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            }
        }).then(
            response => {
                if (response.ok) {
                    return response.json().then(data => {
                        setProduct(data);
                        setIsLoading(false);
                    })
                }
                throw new Error("Producto no encontrado");
            }            
        ).catch(err => {
            navigate('/');
            toast.warn("Producto no encontrado")
            return;
        });
    }

    useEffect(() => {
        if ( useAuth().role === 'Admin'){
            navigate('/Stores');
            return;
        }
        GetProduct();
    }, []);

    useEffect(() => {
        if (product.visible === false) {
            navigate("/Stores");
            toast.warn("Este producto no esta disponible de momento.");
            return;
        }
    }, [isloading])

    const getStoreActivity = () => {
        setActivityDone(false);
        fetch(`https://tienduki.up.railway.app/api/clientActivity/getStoreActById/${useAuth().user._id}/Product`)
        .then(
            response => response.json().then(data => {
                setActivity(data);
                setActivityDone(prev => !prev);
            })
        )
    }

    const saveStoreActivity = () => {
        fetch(`https://tienduki.up.railway.app/api/activity/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id_element: idProduct,
                    type_activity: "Product",
                    id_user: useAuth().user._id
                }
            ),
        }).then(
            (response) => response.json()            
        ).then((data) => {            
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const UpdateActivity = (activityToUpdate) => {
        fetch(`https://tienduki.up.railway.app/api/activity/${activityToUpdate.id_activity._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            (response) => response.json()            
        ).then((data) => {            
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    useEffect(() => {
        if (useAuth().role === "Client") {
            getStoreActivity();            
        }
    }, []);

    useEffect(() => {
        if (activityDone) {
            const activityMap = activity.map(activityMaping => {
                let notFound = "false";
                if (activityMaping.id_activity.id_element === idProduct) {
                    return {found: "true"};
                }else {
                    return {found: notFound};                    
                }
            });

            const activityNotRegistered = activityMap.find(activityMapped => {
                return activityMapped.found === "true"
            });
            
            if (activityMap.length === 0) {
                saveStoreActivity();
            } else if (activityMap.length < 5) {                            
                if (activityNotRegistered === undefined) {
                    saveStoreActivity();
                }
            } else if (activity.length === 5) {
                const lastActivity = activity.sort((a,b) => {
                    return Date.parse(a.createdAt) - Date.parse(b.createdAt);
                })
                if (activityNotRegistered === undefined) {
                    UpdateActivity(lastActivity[0]);
                    saveStoreActivity();
                }                
            }
        }
    }, [activityDone]);    

    if(!isloading){        
        if (!mainImage && product.image_product.length !== 0) {
            setMainImage(product.image_product[0]?.imageUrl);
        }
    
        const handleClickImages = (e) => {
            if(mainImage === e.target.src){
                return;
            }
            setMainImage(e.target.src);
            return;
        }
    
        const getCartFromLocalStorage = () => {
            const Cart = JSON.parse(localStorage.getItem("Cart")) || [];
            return Cart;
        }
    
        const handleClickCart = () => {
            const Cart = getCartFromLocalStorage();
            
            const StoreInCart = Cart.find((element) => element.id === id) || [];      
    
            let Product = {
                id: product._id,
                name: product.name,
                price: product.price.$numberDecimal,
                quantity: 1
            }
    
            const StoreCart = {
                Store: Store,
                id: id,            
                Products: StoreInCart.length === 0 ? [{Product}] : [...StoreInCart.Products, {Product}],            
            }
            if (Cart.find((element) => element.id === id)) {
                const StoreProducts = Cart.find((element) => element.id === id).Products.map(element => element.Product);
                
                if(StoreProducts.find(element => element.id === Product.id)){
                    const ProductInStoreCart = StoreProducts.find(element => element.id === Product.id);
                    const ProductInStoreCartIndex = StoreProducts.findIndex(element => element.id === Product.id);
                    
                    Cart.find((element) => element.id === id).Products.map(element => element.Product)[ProductInStoreCartIndex] = ProductInStoreCart.quantity++;                
                }else {
                    Cart.find((element) => element.id === id).Products = StoreCart["Products"];
                }
            }else {
                Cart.push(StoreCart);
            }        
    
            toast.success("Producto agregado al carrito", {
            });
            
            localStorage.setItem("Cart", JSON.stringify(Cart));
        }
    
        const imagesMap = product.image_product.map((image) => {
            return (
                <div key={image._id}>
                    <img src={image.imageUrl} onClick={handleClickImages} alt="Product Image" />
                </div>
            );
        });   
    
        return (
            <div className={ classes["Product"] }>
                <div className={ classes["Product-images"] }>
                    <div className={ classes["Product-Main-image"] }>
                        <img src={mainImage} alt="Product Image" />
                    </div>
                    <div className={ classes["Product-Extra-images"] }>
                        { imagesMap }
                    </div>
                </div>
                <div className={ classes["Product-Details"] }>
                    <div className={ classes["Product-header"] }>
                        <div className={ classes["Product-header-info"] }>
                            <h4>{ product.name }</h4>
                            <h4>#{ idProduct }</h4>
                        </div>
                        <div className={ classes["Line"] }></div>
                        <div className={ classes["Product-price"] }>
                        { product.price.$numberDecimal && Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.price.$numberDecimal)
                        }
                        </div>
                    </div>
                    <div className={ classes["Product-body"] }>
                        <p>{ product.description }</p>
                    </div>
                    {
                        useAuth().role === "Client" && 
                        <div className={ classes["Product-actions"] }>
                            {/* <button className={ `${classes["btn"]} ${classes["btn-primary"]}` }>Ordenar Producto</button> */}
                            <button className={ `${classes["btn"]} ${classes["btn-primary"]} ${classes["btn-medium-font"]}` } onClick={handleClickCart}><MdShoppingCart/>Añadir al carrito</button>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }

    return (
        <Spinner isloading={isloading}/>
    ) 
    
}

export default Product;