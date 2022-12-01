import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={ classes["Footer"] }>
            <div className={ classes["Footer-Info"] }>
                <div className={ classes["Footer-Lists"] }>
                    <h3>
                        Síguenos
                    </h3>
                    <div>
                        <a>Facebook</a>
                        <a>Instagram</a>
                        <a>Twitter</a>
                    </div>
                </div>
                <div className={ classes["Footer-Lists"] }>
                    <h3>
                        Sobre nosotros
                    </h3>
                    <div>
                        <a>Información de desarrolladores</a>
                        <a>Información sobre Tienduki.com</a>
                        <a>Políticas</a>
                    </div>
                </div>
            </div>
            <div className={ classes["Footer-CopyRight"]}>
                Copyright  © 2022 - 2022 Tienduki Inc. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;