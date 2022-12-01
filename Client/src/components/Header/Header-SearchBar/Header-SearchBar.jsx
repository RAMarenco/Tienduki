import classes from './Header-SearchBar.module.scss'
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';

const Header_SearchBar = () => {
    return (
        <div className={ classes["Header_SearchBar"] }>
            <SearchBar />
            <SearchButton />
        </div>
    );
}

export default Header_SearchBar;