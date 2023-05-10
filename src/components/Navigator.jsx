import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import '../../../styles/style.css';
import { getAuthenticatedUser } from '../config/ConfigIdentity';
import LoginButton from "../pages/public/auth/Login";

function Navigator() {
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
                        <Link className="navbar-brand" to="/home">
                            Cundi<span className="fw-bold">Code</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/resources">Conceptos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/exercises">Ejercicios</Link>
                                </li>   
                            </ul>
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
                                            <LoginButton/>
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
export default Navigator;