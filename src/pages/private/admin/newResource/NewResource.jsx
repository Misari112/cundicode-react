import { Fragment, useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SetNewResource } from "../../../../services/ResourcesService";
import { getAuthenticatedUser } from "../../../../config/ConfigIdentity";

function NewResource() {
    const [user, setUser] = useState('');
    const [content, setContent] = useState('');
    const [resourceData, setResourceData] = useState({
        Title: "",
        Content: "",
        IdUser: "",
        Summary: ""
    });
    useEffect(() => {
        async function getUser() {
            const user = await getAuthenticatedUser();
            setUser(user);
            resourceData.IdUser = user.profile.sub;
        }
        getUser();
    }, []);

    if(!user){
        return (<>
            <p>????</p>
        </>)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResourceData((prevExerciseData) => ({ ...prevExerciseData, [name]: value }));
    };

    const handleContent = (value) => {
        setContent(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resourceData.Content = content;
        SetNewResource(resourceData);
    };

    return (
        <Fragment>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="Title"
                    value={resourceData.Title}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="summary" className="form-label">Summary:</label>
                <input
                    className="form-control"
                    type="text"
                    id="summary"
                    name="Summary"
                    value={resourceData.Summary}
                    onChange={handleChange}
                />
            </div>
            <ReactQuill value={content} onChange={handleContent} />
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>Agregar</button>
        </Fragment>
    );
}

export default NewResource;
