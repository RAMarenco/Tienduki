import classes from './CategorySphere.module.scss';
import { Link } from 'react-router-dom';

const CategorySphere = ({ Category = "",  }) => {
    return (
        <Link to={Category  ? `/Stores/Category/${Category}` : ""} className={ classes["CategorySphere"] }>        
            <h3><span>Ver más</span><span>...</span></h3>
        </Link>
    );
}

export default CategorySphere;