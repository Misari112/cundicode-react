import { Fragment, useEffect, useState } from "react";

function OutputCard(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        if (props.list && props.list.length > 0) {
            const updatedList = props.list.map((item) => {
                if (item.Output) {
                    const outputObj = JSON.parse(item.Output);
                    return { ...item, Output: outputObj };
                } else {
                    return item;
                }
            });
            setList(updatedList);
        }
    }, [props]);

    return (
        <Fragment>
            {list ? <>
                {list.map((item, index) => (
                    <Fragment key={index}>
                        <div className="card d-flex justify-content-center align-items-center">
                        {item.State ? (<span className="badge bg-success">Status</span>) : (<span className="badge bg-danger">Status</span>)}
                            <div className="card-body">
                                <h5 className="card-title">Your Output</h5>
                                <pre>{item.Output.output}</pre>
                                <hr className="dropdown-divider"></hr>
                                <h5 className="card-title">Expected Output</h5>
                                <pre>{item.ExpectedOutput}</pre>
                            </div>
                            <p>Memory: {item.Output.memory}KB Time: {item.Output.cpuTime} sec</p>
                        </div>
                    </Fragment>
                ))}
            </> : <></>}
        </Fragment>
    );
}

export default OutputCard;