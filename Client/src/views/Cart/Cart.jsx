import 'react-toastify/dist/ReactToastify.css';

import Quantity from '../../components/Cart/Quantity';
import classes from './Cart.module.scss';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../core/AuthRoleUser';

const Cart = () => {

    let CartLocalStorage = JSON.parse(localStorage.getItem('Cart')) || [];

    const handleClick = (e) => {
        const id = e.target.id.split(" ");
        
        if (CartLocalStorage.find((element) => element.id === id[0])) {
            const StoreProducts = CartLocalStorage.find((element) => element.id === id[0]).Products.map(element => element.Product);
            
            if(StoreProducts.find(element => element.id === id[1])){
                const ProductInStoreCart = StoreProducts.find(element => element.id === id[1]);
                const ProductInStoreCartIndex = StoreProducts.findIndex(element => element.id === id[1]);
                if (id[2] === "add"){
                    CartLocalStorage.find((element) => element.id === id[0]).Products.map(element => element.Product)[ProductInStoreCartIndex] = ProductInStoreCart.quantity++;
                    toast.success("Producto agregado al carrito");
                }else if (id[2] === "remove"){
                    CartLocalStorage.find((element) => element.id === id[0]).Products.map(element => element.Product)[ProductInStoreCartIndex] = ProductInStoreCart.quantity--;

                    if(ProductInStoreCart.quantity === 0){
                        CartLocalStorage.find((element) => element.id === id[0]).Products = CartLocalStorage.find((element) => element.id === id[0]).Products.filter(element => element.Product.id !== id[1]);
                        
                        if(CartLocalStorage.find((element) => element.id === id[0]).Products.length === 0) {
                            CartLocalStorage = CartLocalStorage.filter((element) => element.id !== id[0]);
                        }
                    }
                    toast.warn("Producto eliminado del carrito");
                }else {
                    CartLocalStorage.find((element) => element.id === id[0]).Products = CartLocalStorage.find((element) => element.id === id[0]).Products.filter(element => element.Product.id !== id[1]);
                    toast.warn("Producto eliminado del carrito");
                    if(CartLocalStorage.find((element) => element.id === id[0]).Products.length === 0) {
                        CartLocalStorage = CartLocalStorage.filter((element) => element.id !== id[0]);
                    }
                }
            }
            setData(CartLocalStorage);
        }

        localStorage.setItem("Cart", JSON.stringify(CartLocalStorage));
    }    
    
    const [data, setData] = useState([]);
    
    if (CartLocalStorage.length !== 0 && data.length === 0) {
        setData(CartLocalStorage);
    }

    const OrderDetails = (product, order_id, store) => {
        fetch(`https://tienduki.up.railway.app/api/orderDetail/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    quantity: product.Product.quantity, 
                    date_of_order: Date.now(), 
                    total: (product.Product.quantity*product.Product.price), 
                    id_state: "637d98c18175bb8c8a5faa24", 
                    id_product: product.Product.id, 
                    id_order: order_id
                }
            ),
        }).then(
            (response) => response.json()
        ).then((data) => {
            toast.success("Orden añadida con exito!");
            CartLocalStorage = CartLocalStorage.filter((element) => element.id !== store);
            setData(CartLocalStorage);
            localStorage.setItem("Cart", JSON.stringify(CartLocalStorage));
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const Order = (e) => {
        const dataId = e.target.id;
        const products = data.find(element => element.id === dataId).Products;
        fetch(`https://tienduki.up.railway.app/api/order/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id_client: useAuth().user._id,
                    id_store: dataId
                }
            ),
        }).then(
            (response) => response.json()
        ).then((data) => {            
            products.forEach((product) => {
                OrderDetails(product, data._id, dataId);
            })
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const dataMap = data.map((element) => {
        let total = 0;
        element.Products.forEach((products) => total += products.Product.price * products.Product.quantity);

        return (
            <div key={ element.id } className={ classes["Store"]}>
                <div className={ classes["Store-Name"] }>
                    <h3>
                        {element.Store}
                    </h3>
                </div>
                <div className={ classes["Store-Cart-Details"] }>
                    <div className={ classes["Store-Products"] }>
                        { element.Products.map(
                            product => {
                                return (
                                    <div key={ product.Product.id } className={ classes["Store-Product"] }>
                                        <div className={ classes["Product-Quantity"] }>
                                            <button id={`${element.id} ${product.Product.id} add`} onClick={ handleClick }>+</button>
                                                <Quantity Quantity={product.Product.quantity}/>
                                            <button id={`${element.id} ${product.Product.id} remove`} onClick={ handleClick }>-</button>
                                        </div>
                                        <div className={ classes["Product-Name"] }>
                                            <span>{ product.Product.name }</span>
                                            &nbsp;
                                            <span>{ 
                                                Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format((product.Product.price * product.Product.quantity))
                                            }</span>
                                        </div>
                                        <button id={`${element.id} ${product.Product.id} delete`} onClick={handleClick} className={ classes["removeFromCart"] }>
                                            x
                                        </button>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className={ classes["Store-extras"] }>
                        <span>
                            <h4>Subtotal:</h4>
                            { 
                                Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(total) 
                            }
                        </span>
                        <button className={`${classes["btn"]} ${classes["btn-primary"]}`} onClick={Order} id={`${element.id}`}>Ordenar</button>
                    </div>
                </div>
                <hr />
            </div>
        );
    });

    return (
        <div className={ classes["Cart"] }>
            <div className={ classes["Header"] }>
                <div className={ classes["Title"] }>
                    <h2>
                        Carrito
                    </h2>
                </div>
                <div className={ classes["Line"] }></div>
            </div>
            <div className={ classes["Cart-Card"] }>
                { dataMap }
            </div>
        </div>
    );
}

export default Cart;