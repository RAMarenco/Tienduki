import classes from './SideMenu-SearchBar.module.scss'
import SearchBar from './SearchBar/SearchBar';
import SearchButton from './SearchButton/SearchButton';

const SideMenu_SearchBar = () => {
    return (
        <div className={ classes["SideMenu_SearchBar"] }>
            <SearchBar />
            <SearchButton />
        </div>
    );
}

export default SideMenu_SearchBar;