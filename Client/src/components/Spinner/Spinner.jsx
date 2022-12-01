import classes from './Spinner.module.scss';
import FadeLoader from 'react-spinners/FadeLoader';

const Spinner = ({isloading}) => {
    return (
        <div className={ classes["Spinner"] }>
            <FadeLoader
            color='#FCFFFF'
            loading={isloading}
            className={ classes["Spinner-spinner"]}
        />
        </div>
    );
}

export default Spinner;
