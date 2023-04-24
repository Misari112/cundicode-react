import { useState } from "react";
import { Fragment } from "react";
import { SetNewExercise } from "../../../services/ExercisesService";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import Navigator from "../../../components/Navigator";

function NewExercise() {
    const [message, setMessage] = useState("");
    const [example, setExample] = useState({
        input: "",
        output: ""
    });
    const [testCase, setTestCase] = useState({
        input: "",
        output: ""
    });
    const [exerciseData, setExerciseData] = useState({
        title: "",
        difficultyLevel: "",
        categories: "",
        description: "",
        examples: [],
        timeLimit: "",
        memoryLimit: "",
        functionSignature: "",
        solutionTemplate: "",
        hints: "",
        testCases: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExerciseData((prevExerciseData) => ({ ...prevExerciseData, [name]: value }));
    };

    const handleExample = (e) => {
        e.preventDefault();
        console.log(example);
        exerciseData.examples.push(example);
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
        exerciseData.testCases.push(testCase);
        setTestCase({ input: "", output: "" });
        console.log(exerciseData);
    };

    function handleChangeSolutionTemplate(newValue) {
        //console.log("change", newValue);
        exerciseData.solutionTemplate = newValue;
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
            <Navigator/>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
            <div className="container-fluid w-50 bg-secondary">
                <h2>Nuevo ejercicio</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={exerciseData.title}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Level:
                    <input
                        type="text"
                        name="difficultyLevel"
                        value={exerciseData.difficultyLevel}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Categories:
                    <input
                        type="text"
                        name="categories"
                        value={exerciseData.categories}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={exerciseData.description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Time Limit:
                    <input
                        type="text"
                        name="timeLimit"
                        value={exerciseData.timeLimit}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Memory Limit:
                    <input
                        type="text"
                        name="memoryLimit"
                        value={exerciseData.memoryLimit}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Function Signature:
                    <input
                        type="text"
                        name="functionSignature"
                        value={exerciseData.functionSignature}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Solution Template:
                    <AceEditor
                        id="code"
                        value={exerciseData.solutionTemplate}
                        mode="java"
                        theme="monokai"
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        onChange={handleChangeSolutionTemplate}
                    />
                </label>
                <br />
                <label>
                    Hints:
                    <input
                        type="text"
                        name="hints"
                        value={exerciseData.hints}
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
        </Fragment>
    );
}

export default NewExercise;