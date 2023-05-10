import { useState, Fragment } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { getAuthenticatedUser } from '../../../config/ConfigIdentity';
import { useEffect } from "react";
import { CompileCustomCode, compileExamples, CompileTestCases } from "../../../services/ExercisesService";
import OutputCard from "./components/OutputCard";

function Editor(props) {
    const [code, setCode] = useState('');
    const [id, setId] = useState('');
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [customOutput, setCustomOutput] = useState('');
    const [examplesVisible, setExamplesVisible] = useState(false);
    const [user, setUser] = useState('');
    const [testCaseOutput, setTestCaseOutput] = useState('');
    useEffect(() => {
        async function getUser() {
            const user = await getAuthenticatedUser();
            setUser(user);
        }
        getUser();
    }, []);

    useEffect(() => {
        setCode(props.solutionTemplate);
        setId(props.id);
    }, [props]);

    function handleChangeCode(newValue) {
        setCode(newValue);
    };

    const handleChangeInput = (e) => {
        setStdin(e.target.value);
    };

    const handleTest = async () => {
        console.log("Enviando");
        const eCase = {
            script: code,
            stdin: stdin,
            version: version,
            language: language
        };

        alert("Enviando " + eCase.script + " input " + eCase.stdin + eCase.version + eCase.language);

        const response = await CompileCustomCode(eCase);
        setCustomOutput(response);
        console.log(response);
    };

    const [language, setLanguage] = useState('java');
    const [editorLanguage, setEditorLanguage] = useState('java');
    const [version, setVersion] = useState('4');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        if (event.target.value === 'java') {
            setEditorLanguage('java');
            setVersion("4");
        } else {
            if (event.target.value === 'python3') {
                setEditorLanguage('python');
                setVersion("1");
            } else {
                setEditorLanguage('c_cpp');
                setVersion("1");
            }
        }
        console.log(language + version);
    };

    const handleTestExamples = async () => {
        setCustomOutput('');
        setTestCaseOutput('');
        if(user){
            const eCase = {
                script: code,
                id: id,
                version: version,
                language: language
            };
    
            alert("Enviando " + eCase.script + " " + eCase.version + " " + eCase.language);
    
            const response = await compileExamples(eCase);
            setOutput(response);
            setExamplesVisible(true);
            console.log(response);
        } else{
            alert("Inicie sesión")
        }
    };

    const handleTest_TestCases = async () => {
        
        if(user){
            const eCase = {
                id: id,
                script: code,
                language: language,
                version: version,
                idUser: user.profile.sub,
            };
    
            alert("Enviando " + eCase.script);
        
            const response = await CompileTestCases(eCase);
            setTestCaseOutput(response);
            console.log(response);
        } else{
            alert("Inicie sesión")
        }

    };

    function handleExamplesVisibles() {
        if (examplesVisible) {
            setExamplesVisible(false);
        } else {
            setExamplesVisible(true);
        }
    };

    return (
        <Fragment>
            <select value={language} onChange={handleLanguageChange}>
                <option value="python3">Python</option>
                <option value="java">Java</option>
                <option value="cpp17">C++</option>
            </select>
            <p>{props.iduser}</p>
            <AceEditor
                id="code"
                value={code}
                mode={editorLanguage}
                onChange={handleChangeCode}
                theme="monokai"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
            />
            <button className="btn btn-primary mt-1 mb-1" onClick={handleTestExamples}>Execute</button>
            <button className="btn btn-secondary mt-1 mb-1 ms-1 me-1" onClick={handleTest}>Execute Custom Code</button>
            <button className="btn btn-success mt-1 mb-1" onClick={handleTest_TestCases}>Submit</button>
            <br />
            <textarea onChange={handleChangeInput} id="input" />
            {customOutput && <>
                <div className="card d-flex justify-content-center align-items-center">
                    <div className="card-body">
                        <h5 className="card-title">Your Output</h5>
                        <pre>{customOutput.output}</pre>
                    </div>
                    <p>Memory: {customOutput.memory}KB Time: {customOutput.cpuTime} sec</p>
                </div>
            </>}
            <br />
            {testCaseOutput && <>
                <div className="card d-flex justify-content-center align-items-center">
                    <div className="card-body">
                        <pre>{testCaseOutput}</pre>
                    </div>
                </div>
            </>}
            <br />
            {examplesVisible ? (
                <Fragment>
                    <button className="btn btn-secondary mb-3" onClick={handleExamplesVisibles}>Show</button>
                    <OutputCard list={output} />
                </Fragment>) : (<><button className="btn btn-secondary" onClick={handleExamplesVisibles}>Show</button></>)}

        </Fragment>
    );
}

export default Editor;