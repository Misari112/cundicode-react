import { Fragment, useState, useEffect } from "react";
import { getAuthenticatedUser } from "../../../config/ConfigIdentity";

function ProfileData() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const user = await getAuthenticatedUser();
            setUser(user);
        }
        getUser();
    }, []);

    const defaultImage = "https://via.placeholder.com/150"; // Imagen por defecto

    return (
        <Fragment>
            <h2>Profile Data</h2>
            {user && (
                <>
                    <img
                        src={defaultImage}
                        className="card-img-top img-thumbnail"
                        alt="Profile"
                        style={{ width: "100px", height: "100px", margin: "auto" }}
                    />
                    <div className="card" style={{ width: "50rem" }}>

                        <div className="card-body">
                            <h5 className="card-title">{user.profile.name}</h5>
                            <p className="card-text">Email: {user.profile.email}</p>
                            <p className="card-text">Biografía: Esta es mi biografía de muestra.</p>
                            <p className="card-text">Ubicación: Ciudad de Ejemplo, País de Ejemplo</p>
                            <p className="card-text">Fecha de nacimiento: DD/MM/AAAA</p>
                        </div>
                    </div>
                </>

            )}
        </Fragment>
    );
}

export default ProfileData;
