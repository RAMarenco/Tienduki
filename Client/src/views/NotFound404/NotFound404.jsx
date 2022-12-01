import classes from './NotFound404.module.scss';

import { Link } from 'react-router-dom';

import { FaRegSadCry } from 'react-icons/fa'

const NotFound404 = () => {
    return (
        <div className={ classes["NotFound404"] }>
            <div className={ classes["SadIcon"]}>
                <FaRegSadCry/>
            </div>
            <div className={ classes["Info404"] }>
                <h2>404</h2>
                <h3>Página no encontrada</h3>
            </div>

            <Link to="/">Regresar a inicio</Link>
        </div>
    )
}

export default NotFound404;