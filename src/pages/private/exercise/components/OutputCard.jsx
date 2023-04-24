import { Fragment, useEffect, useState } from "react";

function OutputCard(props) {
    const [list, setList] = useState([]);
    const cardWidth = "18";

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
            {list ? (
                <Fragment>
                    {list.map((item, index) => (
                        <Fragment key={index}>
                            <p className="p-0 m-0">
                                <a className="btn btn-secondary m-0 p-0" data-bs-toggle="collapse" href={"#collapseExample" + index.toString()} role="button" aria-expanded="false" aria-controls={"collapseExample" + index.toString()}>
                                    Example {index + 1}
                                </a>
                            </p>
                            <div className="collapse " id={"collapseExample" + index.toString()}>
                                <div className="card" style={{ width: cardWidth + 'rem' }}>
                                    {item.State ? (<span className="badge bg-success">Status</span>) : (<span className="badge bg-danger">Status</span>)}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">Your Output</h6>
                                                <div className="container">
                                                    <pre>{item.Output.output}</pre>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="card-body text-center">
                                                <h6 className="card-title">Expected Output</h6>
                                                <div className="container">
                                                    <pre>{item.ExpectedOutput}</pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="card-body text-center">
                                            <p>Memory: {item.Output.memory}KB Time: {item.Output.cpuTime} sec</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}

                </Fragment>) : (
                <Fragment>

                </Fragment>)}
        </Fragment>
    );
}

export default OutputCard;