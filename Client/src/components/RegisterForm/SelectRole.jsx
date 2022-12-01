import classes from './SelectRole.module.scss';
import { MdPerson, MdStore } from "react-icons/md";

const SelectRole = (props) => {
    const { nextStep, threeSteps } = props;

    return (
        <main>
            <div className={classes["background-image"]}></div>

            <div className={classes["select-role-container"]}>
                <div className={classes["select-role"]}>
                    <h2>Tipo de cuenta a crear</h2>
                    <div className={classes["container"]}>
                        <div className={classes["card"]} onClick={nextStep}>
                            <div className={classes["icons"]}>
                                <MdPerson/>
                            </div>
                            <h3>Cliente</h3>
                        </div>
                        
                        <div className={classes["card"]} onClick={threeSteps}>
                            <div className={classes["icons"]}>
                                <MdStore/>
                            </div>
                            <h3>Vendedor</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SelectRole;