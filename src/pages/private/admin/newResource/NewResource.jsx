import { Fragment, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function NewResource() {
    const [content, setContent] = useState('');
    const [formattedContent, setFormattedContent] = useState('');
    const handleEditorChange = (value) => {
        setContent(value);
    };
    const handleSave = () => {
        setFormattedContent(document.querySelector('.ql-editor').innerHTML);
        // hacer algo con el contenido formateado...
    };
    const divStyle = {
        width: '50rem',
      };
    return (
        <Fragment>
            <div className="container d-flex justify-content-center align-items-center">
                <img src="https://cdn.discordapp.com/attachments/1010361546100178954/1100963660916080760/6201803e9abd9.png" alt="My Image" width="200" height="200" />
                <h1>Coming soon</h1>
            </div>
            <ReactQuill value={content} onChange={handleEditorChange} />
            <button onClick={handleSave}>Guardar contenido formateado</button>
            <div className="card" style={divStyle}>
                <div className="card-body">
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </div>
            
            <pre>{JSON.stringify(formattedContent, null, 2)}</pre>
        </Fragment>
    );
}

export default NewResource;