import classes from './Orders.module.scss';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useAuth } from './../../../core/AuthRoleUser';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import { MdOutlineCancel, MdOutlinedFlag } from 'react-icons/md';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const user = useAuth().role;
    const handleNoAuthMessage = useOutletContext();

    const GetOrders = () => {
        fetch(`https://tienduki.up.railway.app/api/order/${user === "Vendor" ? `store/${useAuth().user._id}` : useAuth().user._id}`).then(
            response => response.json().then(data => {
                setOrders(data);
            })
        )
    }
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, orders]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;
        setItemOffset(newOffset);
    };

    const handleFinishClick = orderid => (e)=> {
        fetch(`https://tienduki.up.railway.app/api/orderDetail/${orderid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "638456584fbab15ba302f641"
            }),
        }).then(
            (response) => response.json()
        ).then((data) => {
            toast.info("Orden actualizada")
            GetOrders();   
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const handleCancelClick = orderid => (e)=> {
        fetch(`https://tienduki.up.railway.app/api/orderDetail/${orderid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: "638456634fbab15ba302f643"
            }),
        }).then(
            (response) => response.json()
        ).then((data) => {
            toast.info("Orden actualizada")
            GetOrders();
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }    


    useEffect(() => {
        if(user === "Admin") {
            handleNoAuthMessage();
            navigate('/Profile');
        }else {
            GetOrders();
        }
    }, [])
    
    return (
        <div className={ classes["Orders"] }>
            <div className={ classes["Orders-Title"] }>
                <h2>Órdenes</h2>
                <div className={ classes["Line"] }></div>
            </div>
            <div className={ classes["Orders-container"] }>
                <div className={ classes["Table-container"] }>
                    <table className={ classes["Table"] }>
                    {user === "Client" ? 
                        <>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Tienda</th>
                                    <th>Productos</th>
                                    <th>Estado</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(post => {                                    
                                    let total = 0;
                                    post.detail.forEach(element => {
                                        total += Number(element.total.$numberDecimal);
                                    });
                                    return (
                                        <tr key={post._id}>
                                            <td data-label="Fecha">{new Date(post.createdAt).toISOString().split('T')[0]}</td>
                                            <td data-label="Tienda"><Link><img src={post.id_store.image_user.find(image => image.id_image_type.category === "Profile").imageUrl} alt={`${post.id_store.username} store`} /></Link></td>
                                            <td data-label="Productos">
                                                <div>
                                                    {post.detail.map(product => {
                                                        return (
                                                            <p key={product.id_product._id}>{product.id_product.name} <b>x{product.quantity}</b></p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td data-label="Estado">
                                                {post.detail[0].id_state.state}
                                            </td>
                                            <td data-label="Subtotal">
                                                {
                                                Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(total)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </>
                        :
                        <>
                            <thead>
                                <tr>
                                    <th>Productos</th>
                                    <th>Comprador</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(post => {
                                    let total = 0;
                                    post.detail.forEach(element => {
                                        total += Number(element.total.$numberDecimal);
                                    });
                                    return (
                                        <tr key={post._id}>
                                            <td data-label="Productos">
                                                <div>
                                                    {post.detail.map(product => {
                                                        return (
                                                            <p key={`${product.id_product._id} ${post._id}`}>{product.id_product.name} <b>x{product.quantity}</b></p>
                                                        )
                                                    })}
                                                </div>
                                            </td>
                                            <td data-label="Comprador">{post.id_client.name} {post.id_client.lastname}</td>
                                            <td data-label="Estado">{post.detail[0].id_state.state}</td>
                                            <td data-label="Total">
                                                {
                                                Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(total)}
                                            </td>
                                            <td data-label="Acciones" className={ `${classes["actions-buttons"]} ${post.detail[0].id_state.state !== "Activo" ? classes["darkgreyBack"] : ""}` }>
                                                {post.detail[0].id_state.state === "Activo" &&
                                                    <div>
                                                        <button className={ `${classes["btn"]} ${classes["btn-success"]}` } onClick={handleFinishClick(post._id)}><MdOutlinedFlag/></button>
                                                        <button className={ `${classes["btn"]} ${classes["btn-error"]}` } onClick={handleCancelClick(post._id)}><MdOutlineCancel/></button>
                                                    </div>                                                    
                                                    }                                                
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </>
                    }
                        
                    </table>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<IoIosArrowForward/>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={<IoIosArrowBack/>}
                    renderOnZeroPageCount={null}
                    containerClassName={classes["pagination"]}
                    previousClassName={classes["action-button-container"]}    
                    nextClassName={classes["action-button-container"]}
                    pageLinkClassName={classes["page-num"]}
                    previousLinkClassName={classes["action-button-pagination"]}
                    nextLinkClassName={classes["action-button-pagination"]}
                    activeClassName={classes["active-page"]}
                    breakLinkClassName={classes["page-num"]}
                />
            </div>
        </div>
    );

}

export default Orders;