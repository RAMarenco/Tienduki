import classes from './Store.module.scss';

import { useState, useEffect, useRef } from 'react';
import { useOutlet, Outlet, Link, useOutletContext, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../../core/AuthRoleUser';

import StoreSphere from './../../components/Stores/StoreSections/StoreSpheres/StoreSphere';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { IoPencil, IoTrash } from 'react-icons/io5';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { BsUpload } from 'react-icons/bs';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner/Spinner';


const StoreV = () => {    
    const outlet = useOutlet();    
    const user = useAuth().role;
    const navigate = useNavigate();
    const [isloading, setIsLoading] = useState(true);
    const [done, setDone] = useState(false);
    const [userData, setUserData] = useState([]);  
    const [products, setProducts] = useState([]);
    const imageInput = useRef(null);
    const [image, setImage] = useState("");
    const [imageId, setImageId] = useState("");
    const [formData, setFormData] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const storeId = useAuth().user._id;

    const handleNoAuthMessage = useOutletContext();

    const GetProducts = () => {
        setDone(false);
        fetch(`https://tienduki.up.railway.app/api/storeProduct/store/${useAuth().user._id}`).then(
            response => response.json().then(data => {
                setProducts(data);
                setDone(true);
            })
        );
    }

    const GetUser = () => {
        setIsLoading(true);
        fetch(`https://tienduki.up.railway.app/api/user/${useAuth().user._id}`).then(
            response => response.json().then(data => {
                setUserData(data);
                setIsLoading(false)
            })
        );
    }
    
    
    useEffect(() => {
        if(user !== "Vendor") {
            handleNoAuthMessage();
            navigate('/');
            return;
        }else {
            GetProducts();            
        }
    }, [outlet]);

    useEffect(() => {
        GetUser();
    }, [done])
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const endOffset = Number(itemOffset) + Number(itemsPerPage);
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, products]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    const handleSelectChange = (e) => {
        toast.info("Productos cargados nuevamente.");
        setItemsPerPage(e.target.value);
    }

    const handleAddButton  = () => {
        navigate('./StoreProduct/');
    }

    const uploadImage = () => {
        imageInput.current.click();
    }

    const handleImageChange = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }        
        e.target.value = null;
        const objectUrl = URL.createObjectURL(fileObj);
        setImagePrev(image);
        setImage(objectUrl);
        submitProfileImage(fileObj);
    }

    const submitProfileImage = async (fileObj) => {
        const formData = new FormData();
        formData.append("upload_preset", "bugtracker1");
        formData.append("file", fileObj);
        setFormData(formData);
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
        
        if (image !== "") {
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
                id_image_type: "637e9f9538989439070c24d8"
            }),
        })
        }    
    };

    const handleHideProduct = (id, visible) => (e) => {
        fetch(`https://tienduki.up.railway.app/api/storeProduct/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    visible: !visible
                }                
            )
        }).then(
            (response) => response.json()
        ).then((data) => {
            if (data.visible) {
                toast.info("El producto ya no esta oculto");
            }else {                
                toast.info("Se ha ocultado un producto");
            }                        
            GetProducts();
        }).catch((error) => {
            toast.error(`No se pudo realizar la accion`);
        })
    }

    const handleDeleteProduct = (id) => (e) => {
        fetch(`https://tienduki.up.railway.app/api/storeProduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },            
        }).then(
            (response) => response.json()
        ).then((data) => {
            toast.warn("Se ha eliminado un producto");
            GetProducts();
        }).catch((error) => {
            toast.error(`No se pudo realizar la accion`);
        })
    }    

    useEffect(() => {
        if (userData.length !== 0) {
            const imageIndex = userData.image_user.findIndex(image => image.id_image_type.category === "Banner");
        
            if (imageIndex !== -1) {
                setImage(userData.image_user[imageIndex].imageUrl);
                setImageId(userData.image_user[imageIndex]._id);
            }
        }        
    }, [isloading]);
        
    if(outlet) {
        return (
            <Outlet/>
        )
    }

    const AddCollection = async() => {

        const { value: coleccion } = await Swal.fire({
            title: 'Agrega una coleccion a tu tienda',
            input: 'text',
            inputLabel: 'Ingrese el nombre de la colección a agregar', 
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return '¡No deje el campo vacío!'
                }
            }
        })

        fetch("https://tienduki.up.railway.app/api/productCollection/", {
        method:"POST",
        crossDomain:true,
        headers: {
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify({
            collectionName: coleccion,
            _id_store: storeId
        }),
        }).then(response => response.json())
            .then(data => {
            })
    }  

    if (!isloading) {
        return (
            <div className={ classes["Store"] }>
                <div className={ classes["Store-Header"] }>
                    <div className={ classes["Store-Logo"] }>
                        <StoreSphere extraClass="small" Store={userData} user={user}/>
                    </div>
                    <div className={ classes["Store-Banner"] }>
                        <img src={image} alt={`${userData.username} Banner`} />
                        <h3>{ userData.username }</h3>
                    </div>
                    <input ref={imageInput} onChange={handleImageChange} type="file" accept='image/*'/>
                    <button onClick={uploadImage}>
                        <BsUpload/>
                    </button>
                </div>

                <div className={ classes["Store-Products-container"] }>
                    <div className={ classes["Product-options-main-header"] }>
                        <h4>Lista de productos</h4>
                        <div className={ classes["Product-options-main-actions"] }>
                            <select defaultValue={5} onChange={handleSelectChange}>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <button className={ `${classes["btn"]} ${classes["btn-primary-alt"]}`} onClick={AddCollection}>Agregar colección</button>
                            <button className={ `${classes["btn"]} ${classes["btn-primary"]}`  } onClick={handleAddButton}>Agregar</button>
                        </div>
                    </div>
                    <div className={ classes["Table-container"] }>
                        <table className={ classes["Table"] }>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(post => {
                                    return (
                                        <tr key={post._id}>
                                            <td data-label="Codigo">{post._id}</td>
                                            <td data-label="Producto"><div><p>{post.name}</p></div></td>
                                            <td data-label="Precio">
                                                <div>
                                                    <p>{
                                                        Intl.NumberFormat("en-US", {
                                                            style: "currency",
                                                            currency: "USD",
                                                        }).format(post.price.$numberDecimal)}
                                                    </p>
                                                </div>
                                            </td>
                                            <td data-label="Imagen"><img src={post.image_product[0]?.imageUrl} alt="" /></td>
                                            
                                            <td data-label="Acciones" className={ classes["actions-buttons"] }>
                                                <div>
                                                    <button className={ `${classes["btn"]} ${post.visible ? classes["btn-success"] : classes["btn-error"]}` } onClick={handleHideProduct(post._id, post.visible)}>{post.visible ? <AiFillEye/> : <AiFillEyeInvisible/>}</button>
                                                    <Link to={`./StoreProduct/${post._id}`} className={ `${classes["btn"]} ${classes["btn-primary"]}` }><IoPencil/></Link>
                                                    <button className={ `${classes["btn"]} ${classes["btn-primary"]}` } onClick={handleDeleteProduct(post._id)}><IoTrash/></button>
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
        );
    }   

    return (
        <Spinner isloading={isloading}/>
    )
}

export default StoreV;