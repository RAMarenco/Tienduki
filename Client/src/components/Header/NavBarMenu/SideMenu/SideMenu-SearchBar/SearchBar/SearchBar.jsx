import classes from './SearchBar.module.scss';

const SearchBar = () => {
    return (
        <input type="text" className={ classes["SearchBar"] }/>
    );
}

export default SearchBar;