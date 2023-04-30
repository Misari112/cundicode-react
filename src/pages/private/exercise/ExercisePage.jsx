import { useParams } from "react-router-dom";
import { GetExercise } from "../../../services/ExercisesService";
import { Fragment, useState, useEffect } from "react";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import Navigator from "../../../components/Navigator";
import Editor from "./Editor";
import { getAuthenticatedUser } from '../../../config/ConfigIdentity';
import ExerciseInfo from "./components/ExerciceInfo";

function Exercise() {
    const { id } = useParams();
    const exercise = GetExercise(id);
    const examples = exercise.Examples;
    const [user, setUser] = useState('');
    useEffect(() => {
        async function getUser() {
            const user = await getAuthenticatedUser();
            setUser(user);
        }
        getUser();
    }, []);
    return (
        <Fragment>
            <Navigator />
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                {exercise && examples ? (
                                    <ExerciseInfo exercise={exercise} examples={examples}/>
                                ) : (
                                    <p>Loading exercise...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            {user ? (
                                <Editor solutionTemplate={exercise.SolutionTemplate} id={id} iduser={user.profile.sub}/>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >

    );
}

export default Exercise;
