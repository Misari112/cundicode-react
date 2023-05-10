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
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="title"
                                    name="Title"
                                    value={exerciseData.Title}
                                    onChange={handleChange}
                                />
                            </div>
                            <ReactQuill value={exerciseData.Description} onChange={handleDescriptionChange} />
                            <div className="mb-3">
                                <label htmlFor="categories" className="form-label">Categories:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="categories"
                                    name="Categories"
                                    value={exerciseData.Categories}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="difficultyLevel" className="form-label">Level:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="difficultyLevel"
                                    name="DifficultyLevel"
                                    value={exerciseData.DifficultyLevel}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="timeLimit" className="form-label">Time Limit:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="timeLimit"
                                    name="TimeLimit"
                                    value={exerciseData.TimeLimit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="memoryLimit" className="form-label">Memory Limit:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="memoryLimit"
                                    name="MemoryLimit"
                                    value={exerciseData.MemoryLimit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="functionSignature" className="form-label">Function Signature:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="functionSignature"
                                    name="FunctionSignature"
                                    value={exerciseData.FunctionSignature}
                                    onChange={handleChange}
                                />
                            </div>
                            <label htmlFor="solutionTemplate">Solution Template:</label>
                            <AceEditor
                                id="code"
                                value={exerciseData.SolutionTemplate}
                                mode="java"
                                theme="monokai"
                                name="SolutionTemplate"
                                editorProps={{ $blockScrolling: true }}
                                onChange={handleChangeSolutionTemplate}
                            />
                            <div className="mb-3">
                                <label htmlFor="hints" className="form-label">Hints:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="hints"
                                    name="Hints"
                                    value={exerciseData.Hints}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="container-fluid w-50 bg-secondary p-3 my-3 rounded">
                            <h2 className="mb-3">Ejemplos</h2>
                            <form onSubmit={handleExample}>
                                <div className="mb-3">
                                    <label htmlFor="inputExample" className="form-label">Input:</label>
                                    <textarea
                                        className="form-control"
                                        id="inputExample"
                                        name="input"
                                        value={example.input}
                                        onChange={handleChangeExample}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="outputExample" className="form-label">Output:</label>
                                    <textarea
                                        className="form-control"
                                        id="outputExample"
                                        name="output"
                                        value={example.output}
                                        onChange={handleChangeExample}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Agregar ejemplo</button>
                            </form>
                        </div>
                        <div className="container-fluid w-50 bg-secondary p-3 my-3 rounded">
                            <h2 className="mb-3">Test Cases</h2>
                            <form onSubmit={handleTestCase}>
                                <div className="mb-3">
                                    <label htmlFor="inputTestCase" className="form-label">Input:</label>
                                    <textarea
                                        className="form-control"
                                        id="inputTestCase"
                                        name="input"
                                        value={testCase.input}
                                        onChange={handleChangeTestCase}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="outputTestCase" className="form-label">Output:</label>
                                    <textarea
                                        className="form-control"
                                        id="outputTestCase"
                                        name="output"
                                        value={testCase.output}
                                        onChange={handleChangeTestCase}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Agregar test case</button>
                            </form>
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