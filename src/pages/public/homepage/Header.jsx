import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import '../../../styles/style.css';
import { getAuthenticatedUser } from '../../../config/ConfigIdentity';

function Header() {
    const [user, setUser] = useState('');
    useEffect(() => {
        async function getUser() {
            const user = await getAuthenticatedUser();
            setUser(user);
        }
        getUser();
    }, []);
    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Cundi<span className="fw-bold">Code</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/editor">Editor</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Conceptos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Ejercicios</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Más
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/">Nosotros</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/">Contacto</Link>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                            {user ? (
                                <Fragment>
                                    <ul className="navbar-nav">
                                        <li className="nav-item dropstart ps-2 pe-2 ms-2 bg-success rounded">
                                            <a className="text-light nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user.profile.name}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li>
                                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                                </li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li>
                                                    <Link className="dropdown-item" to="/logout">Logout</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>

                                </Fragment>
                            ) : (
                                <Fragment>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/signup">SignUp</Link>
                                        </li>
                                    </ul>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </Fragment>
    );
}
export default Header;