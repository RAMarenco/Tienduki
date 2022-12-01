import classes from './AdminStores.module.scss';
import { useState, useEffect } from 'react';
import { useOutlet, useOutletContext, Outlet, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoShieldCheckmarkOutline, IoEye } from 'react-icons/io5';

import ReactPaginate from 'react-paginate';

import { IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';

import Spinner from './../../components/Spinner/Spinner';

const AdminStores = () => {
    const [isloading, setIsLoading] = useState(true);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [data, setData] = useState([]);

    const GetStores = () => {
        setIsLoading(true);
        fetch("https://tienduki.up.railway.app/api/storeCategory/all")
        .then(
            response => response.json().then(data => {
                setData(data);
                toast.success("Datos cargados satisfactoriamente.", {
                    toastId: "Exito"
                });
                setIsLoading(false);
            })
        ).catch(() => {
            toast.error("No se pudieron cargar los datos", {
                toastId: "Error"
            });
            setIsLoading(false);
        })
    }

    const banUser = (user) => {
        fetch(`https://tienduki.up.railway.app/api/user/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                visible: !(user.visible)
            }),
        }).then(
            (response) => response.json()
        ).then((data) => {
            if(user.visible){            
                toast.info(`Usuario ${user.name} desbaneado!`);
            }else{
                toast.warn(`Usuario ${user.name} baneado!`);
            }
            GetStores();   
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    useEffect(() => {
        GetStores();
    }, [])

    useEffect(() => {
        const endOffset = Number(itemOffset) + Number(itemsPerPage);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    const handleBanClick = (user) => (e) => {
        banUser(user);
    }

    const handleAddClickNavigate = (e) => {
        navigate('./User/');
    }

    const handleSelectChange = (e) => {
        toast.info("Productos cargados nuevamente.");
        setItemsPerPage(e.target.value);
    }

    if (!isloading) {
        return (
            <div className={ classes["AdminStores"] }>
                <div className={ classes["Admin-container"] }>
                    <div className={ classes["Admin-options-main-header"] }>
                        <h4>Lista de tiendas</h4>
                        <div className={ classes["Admin-options-main-actions"] }>
                            <select defaultValue={5} onChange={handleSelectChange}>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>                            
                        </div>
                    </div>
                    <div className={ classes["Table-container"] }>
                        <table className={ classes["Table"] }>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tienda</th>
                                    <th>Imagen</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map(stores => {
                                        return stores.stores.map(store => {
                                            const profile = store.image_user.findIndex(image => image.id_image_type.category === "Profile");
                                            return (
                                                
                                                <tr key={store._id}>
                                                    <td data-label="Id">{store._id}</td>
                                                    <td data-label="Tienda">{store.username}</td>
                                                    <td data-label="Imagen"><img src={profile !== -1 ? store.image_user[profile]?.imageUrl : "https://thumbs.dreamstime.com/b/store-icon-market-retail-shop-commercial-print-media-web-any-type-design-projects-185043121.jpg"}/></td>
                                                    <td data-label="Acciones" className={ classes["actions-buttons"] }>
                                                        <div>
                                                            <Link to={`./store/${store._id}/${store.username}`} className={ `${classes["btn"]} ${classes["btn-primary"]}` }>
                                                                <IoEye/>
                                                            </Link>
                                                            <button onClick={handleBanClick(store)} className={ `${classes["btn"]} ${!store.visible ? classes["btn-error"] : classes["btn-success"]}` }>
                                                                {store.visible ? <IoShieldCheckmarkOutline/> : <MdOutlineCancel/>}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    })
                                }
                            </tbody>
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
        )
    }

    return (
        <Spinner isloading={isloading}/>
    )
}

export default AdminStores