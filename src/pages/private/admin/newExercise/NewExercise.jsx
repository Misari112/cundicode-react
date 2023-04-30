import { useState } from "react";
import { Fragment } from "react";
import { SetNewExercise } from "../../../../services/ExercisesService";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ExerciseInfo from "../../exercise/components/ExerciceInfo";

function NewExercise() {
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState('');
    const handleDescriptionChange = (value) => {
        setDescription(value);
        exerciseData.Description = value;
    };
    const [example, setExample] = useState({
        input: "",
        output: ""
    });
    const [testCase, setTestCase] = useState({
        input: "",
        output: ""
    });
    const [exerciseData, setExerciseData] = useState({
        Title: "",
        DifficultyLevel: "",
        Categories: "",
        Description: "",
        Examples: [],
        TimeLimit: "",
        MemoryLimit: "",
        FunctionSignature: "",
        SolutionTemplate: "",
        Hints: "",
        TestCases: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExerciseData((prevExerciseData) => ({ ...prevExerciseData, [name]: value }));
    };

    const handleExample = (e) => {
        e.preventDefault();
        console.log(example);
        exerciseData.Examples.push(example);
        setExample({ input: "", output: "" });
        console.log(exerciseData);
    };

    const handleChangeExample = (e) => {
        const { name, value } = e.target;
        setExample((prevExampleData) => ({ ...prevExampleData, [name]: value }));
    };

    const handleTestCase = (e) => {
        e.preventDefault();
        console.log(testCase);
        exerciseData.TestCases.push(testCase);
        setTestCase({ input: "", output: "" });
        console.log(exerciseData);
    };

    function handleChangeSolutionTemplate(newValue) {
        //console.log("change", newValue);
        exerciseData.SolutionTemplate = newValue;
    };

    const handleChangeTestCase = (e) => {
        const { name, value } = e.target;
        setTestCase((prevTestCaseData) => ({ ...prevTestCaseData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(exerciseData);
        SetNewExercise(exerciseData);
    };

    return (
        <Fragment>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <h2>{exerciseData.Title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: exerciseData.Description }}></div>
                                <div className="row">
                                    {exerciseData.Examples ? <>
                                        {exerciseData.Examples.map((item, index) => (
                                            <Fragment key={index}>
                                                <div className="col-sm-6">
                                                    <div className="card d-flex justify-content-center align-items-center">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Input</h5>
                                                            <pre>{item.input}</pre>
                                                            <hr className="dropdown-divider"></hr>
                                                            <h5 className="card-title">Output</h5>
                                                            <pre>{item.output}</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <label>
                                <input
                                    type="text"
                                    name="Title"
                                    value={exerciseData.Title}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <ReactQuill value={exerciseData.Description} onChange={handleDescriptionChange} />
                            <br />
                            <label>
                                Categories:
                                <input
                                    type="text"
                                    name="Categories"
                                    value={exerciseData.Categories}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Level:
                                <input
                                    type="text"
                                    name="DifficultyLevel"
                                    value={exerciseData.DifficultyLevel}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Time Limit:
                                <input
                                    type="text"
                                    name="TimeLimit"
                                    value={exerciseData.TimeLimit}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Memory Limit:
                                <input
                                    type="text"
                                    name="MemoryLimit"
                                    value={exerciseData.MemoryLimit}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Function Signature:
                                <input
                                    type="text"
                                    name="FunctionSignature"
                                    value={exerciseData.FunctionSignature}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Solution Template:
                                <AceEditor
                                    id="code"
                                    value={exerciseData.SolutionTemplate}
                                    mode="java"
                                    theme="monokai"
                                    name="SolutionTemplate"
                                    editorProps={{ $blockScrolling: true }}
                                    onChange={handleChangeSolutionTemplate}
                                />
                            </label>
                            <br />
                            <label>
                                Hints:
                                <input
                                    type="text"
                                    name="Hints"
                                    value={exerciseData.Hints}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                        </div>
                        <br />
                        <div className="container-fluid w-50 bg-secondary">
                            <h2>Ejemplos</h2>
                            <form onSubmit={handleExample}>
                                <label>
                                    Input:
                                    <textarea
                                        type="text"
                                        name="input"
                                        value={example.input}
                                        onChange={handleChangeExample}
                                    />
                                </label>
                                <br />
                                <label>
                                    Output:
                                    <textarea
                                        type="text"
                                        name="output"
                                        value={example.output}
                                        onChange={handleChangeExample}
                                    />
                                </label>
                                <button type="submit">Agregar ejemplo</button>
                            </form>

                            <br />
                        </div>
                        <div className="container-fluid w-50 bg-secondary">
                            <h2>Test Cases</h2>
                            <form onSubmit={handleTestCase}>
                                <label>
                                    Input:
                                    <textarea
                                        type="text"
                                        name="input"
                                        value={testCase.input}
                                        onChange={handleChangeTestCase}
                                    />
                                </label>
                                <br />
                                <label>
                                    Output:
                                    <textarea
                                        type="text"
                                        name="output"
                                        value={testCase.output}
                                        onChange={handleChangeTestCase}
                                    />
                                </label>
                                <button type="submit">Agregar test case</button>
                            </form>

                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
            <div className="container-fluid w-50 bg-secondary">

            </div>
        </Fragment>
    );
}

export default NewExercise;