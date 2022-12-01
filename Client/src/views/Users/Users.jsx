import classes from './Users.module.scss';

import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useAuth } from '../../core/AuthRoleUser';
import { useOutlet, Outlet, Link, useOutletContext, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md';
import { IoPencil, IoShieldCheckmarkOutline } from 'react-icons/io5';

import Spinner from './../../components/Spinner/Spinner';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const outlet = useOutlet();
    const navigate = useNavigate();

    const user = useAuth().role;

    const handleNoAuthMessage = useOutletContext();

    const GetUsers = () => {
        setIsLoading(true);
        fetch("https://tienduki.up.railway.app/api/user/").then(
            response => response.json().then(data => {
                setUsers(data);
                setIsLoading(false);
                toast.success("Datos cargados satisfactoriamente.", {
                    toastId: "Exito"
                });
            })
        )
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
            GetUsers();   
        }).catch(() => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    useEffect(() => {
        if(user !== "Admin") {
            handleNoAuthMessage();
            navigate('/');
        } else {
            if(!outlet) {
                GetUsers();
            }            
        }
    }, [outlet]);

    useEffect(() => {
        const endOffset = Number(itemOffset) + Number(itemsPerPage);
        setCurrentItems(users.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(users.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, users]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        setItemOffset(newOffset);
    };

    const handleSelectChange = (e) => {
        toast.info("Productos cargados nuevamente.");
        setItemsPerPage(e.target.value);
    }

    const handleBanClick = (user) => (e) => {             
        banUser(user);
    }

    const handleAddClickNavigate = (e) => {
        navigate('./User/');
    }
        
    if (outlet){
        return (
            <Outlet/>
        )
    }

    if (!isloading) {
        return (
            <div className={ classes["Users"] }>
                <div className={ classes["Users-container"] }>
                    <div className={ classes["Users-options-main-header"] }>
                        <h4>Lista de usuarios</h4>
                        <div className={ classes["Users-options-main-actions"] }>
                            <select defaultValue={5} onChange={handleSelectChange}>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <button className={ `${classes["btn"]} ${classes["btn-primary"]}`} onClick={handleAddClickNavigate}>Agregar</button>
                        </div>
                    </div>
                    <div className={ classes["Table-container"] }>
                        <table className={ classes["Table"] }>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Activo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(users => {
                                    return (
                                        <tr key={users._id}>
                                            <td data-label="Id">{users._id}</td>
                                            <td data-label="Nombre">{users.name} {users.lastname}</td>
                                            <td data-label="Usuario">{users.username}</td>
                                            <td data-label="Email">{users.email}</td>
                                            <td data-label="Rol">{users.id_rol.rol === "Client" ? "Cliente" : users.id_rol.rol === "Vendor" ? "Vendedor" : "Admin"}</td>
                                            <td data-label="Activo">{users.visible ? "No" : "Si"}</td>
                                            <td data-label="Acciones" className={ classes["actions-buttons"] }>
                                                <div>                                                
                                                    <Link to={`./User/${users._id}`} className={ `${classes["btn"]} ${classes["btn-primary"]}` }><IoPencil/></Link>
                                                    <button onClick={handleBanClick(users)} className={ `${classes["btn"]} ${!users.visible ? classes["btn-error"] : classes["btn-success"]}` }>
                                                        {users.visible ? <IoShieldCheckmarkOutline/> : <MdOutlineCancel/>}                                                    
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
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

export default Users;