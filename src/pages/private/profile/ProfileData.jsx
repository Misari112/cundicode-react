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
    return (
        <Fragment>
            <h2>Profile Data</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Fragment>
    );
}

export default ProfileData;