import { Fragment } from "react";

function ExerciseInfo(props) {
    return (
        <Fragment>
            <h2>{props.exercise.Title}</h2>
            <div dangerouslySetInnerHTML={{ __html: props.exercise.Description }}></div>
            <div className="row">
                {props.examples ? <>
                    {props.examples.map((item, index) => (
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
        </Fragment>
    );
}

export default ExerciseInfo;