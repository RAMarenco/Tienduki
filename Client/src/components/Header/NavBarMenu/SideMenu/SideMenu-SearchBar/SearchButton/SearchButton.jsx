import classes from './SearchButton.module.scss';
import { MdSearch } from 'react-icons/md'

const SearchButton = () => {
    return (
        <button className={ classes['SearchButton'] }>
            <MdSearch className={ classes["SearchButtonIcon"] }/>
        </button>
    );
}

export default SearchButton;