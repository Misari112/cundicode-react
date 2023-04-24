import React, { useState, Fragment } from 'react';
import axios from 'axios';

/// For AceEditor
import AceEditor from "react-ace";
// Ace Editor modes
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
// Ace editor themes
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";

import "ace-builds/src-noconflict/ext-language_tools";
import Navigator from '../../../components/Navigator';
///

function Editor() {

    const [code, setCode] = useState(''); //script
    const [inputStdin, setInputStdin] = useState(''); //stdin
    const [responseC, setResponseC] = useState(''); //response to show
    const [language, setLanguage] = useState('java'); //language
    //const [versionLang, setVersionLang] = useState('java'); //version language (python2, python3...)
    const [version, setVersion] = useState('4'); //version index language (python2 || 0)
    const [expectedOutput] = useState(5 * 12); //expected output kk
    const [editorLanguage, setEditorLanguage] = useState('java');

    const handleSubmit = (event) => {

        event.preventDefault();
        console.log(`El código ingresado es: ${code}`);
        console.log(language + ' ' + version);
        const requestBody = {
            script: code,
            stdin: inputStdin,
            language: language,
            version: version.toString()
        };
        console.log(requestBody);
        axios.post('https://practice-ms.azurewebsites.net/api/Codes', requestBody, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('La compilación fue:', response.data);
                const objeto = response.data;
                setResponseC(objeto.output);
            })
            .catch(error => {
                console.error('Hubo un error:', error);
            });

    };

    function onChangeCode(newValue) {
        //console.log("change", newValue);
        setCode(newValue);
    };

    const handleInputStdinChange = (event) => {
        setInputStdin(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        if (event.target.value === 'java') {
            setEditorLanguage('java');
            setVersion(4);
        } else {
            if (event.target.value === 'python3') {
                setEditorLanguage('python');
                setVersion(1);
            } else {
                setEditorLanguage('c_cpp');
                setVersion(1);
            }
        }
        console.log(language + version);
    };

    return (
        <Fragment>
            <Navigator />
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Description</h5>
                            <br />
                            <div className="card-body">
                                <h5 className="card-title">Expected Output</h5>
                                <p className='card-text'>{expectedOutput}</p>
                            </div>
                            {responseC ? (<div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Output</h5>
                                    <pre>{responseC}</pre>
                                </div>
                            </div>) : null}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/*select language*/}
                                <select value={language} onChange={handleLanguageChange}>
                                    <option value="python3">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp17">C++</option>
                                </select>
                                {/*code editor area*/}
                                <AceEditor
                                    id="code"
                                    value={code}
                                    mode={editorLanguage}
                                    onChange={onChangeCode}
                                    theme="monokai"
                                    name="UNIQUE_ID_OF_DIV"
                                    editorProps={{ $blockScrolling: true }}
                                />
                                {/*input area*/}
                                <div>
                                    <label htmlFor="inputStdin"></label>
                                    <textarea id="inputStdin" value={inputStdin} onChange={handleInputStdinChange} />
                                </div>
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >

    );
}

export default Editor;
