import { useState, Fragment } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { useEffect } from "react";
import { CompileCustomCode, CompileExamples, CompileTestCases } from "../../../services/ExercisesService";
import OutputCard from "./components/OutputCard";

function Editor(props) {
    const [code, setCode] = useState('');
    const [id, setId] = useState('');
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [examplesVisible, setExamplesVisible] = useState(false);

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
            stdin: stdin
        };

        alert("Enviando " + eCase.script + " input " + eCase.stdin);

        const response = await CompileCustomCode(eCase);
        setOutput(response);
        console.log(response);
    };
    
    const handleTestExamples = async () => {
        const eCase = {
            script: code,
            id: id
        };

        alert("Enviando " + eCase.script);

        const response = await CompileExamples(eCase);
        setOutput(response);
        setExamplesVisible(true);
        console.log(response);
    };

    const handleTest_TestCases = async () => {
        const eCase = {
            iduser: props.iduser,
            script: code,
            id: id
        };

        alert("Enviando " + eCase.script);

        const response = await CompileTestCases(eCase);
        console.log(response);
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
            <p>{props.iduser}</p>
            <AceEditor
                id="code"
                value={code}
                mode="java"
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