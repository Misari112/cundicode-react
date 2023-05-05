import { Fragment } from "react";
import { Link } from "react-router-dom";
import '../../../styles/style.css';
import LoginButton from '../auth/Login';
function Header() {
    return (
        <Fragment>
            <header className="header">
                <div className="contenedor">
                    <div className="barra">
                        <Link to="../HomePage" className="logo no-margin centrar-texto">
                            <h1 className="logo__nombre no-margin">
                                Cundi<span className="logo__bold">Code</span>
                            </h1>
                        </Link>
                        <nav className="navegacion">
                            <Link to="/HomePage" className="navegacion__enlace">Nosotros</Link>
                            <Link to="/conceptpage/conceptpage" className="navegacion__enlace">Conceptos</Link>
                            <Link to="/contact/Contactpage" className="navegacion__enlace">Contacto</Link>
                            <LoginButton/>
                        </nav>
                    </div>
                </div>
                <div className="header__texto">
                    <h2 className="no-margin uppercase">Programación Competitiva</h2>
                    <p className="no-margin">
                        Una nueva forma de entrenar tu lógica.
                    </p>
                </div>
            </header>
        </Fragment>
    );
}
export default Header;