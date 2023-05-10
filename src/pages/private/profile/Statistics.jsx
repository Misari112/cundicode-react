import { Fragment, useState, useEffect } from "react";
import { getAuthenticatedUser } from "../../../config/ConfigIdentity";
import { getSolvedProblem } from "../../../services/ExercisesService";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto";
function StatisticsProfile() {
    const [user, setUser] = useState(null);
    const [solvedExercises, setSolvedExercises] = useState([]);

    useEffect(() => {
        async function getUser() {
            try {
                const user = await getAuthenticatedUser();
                setUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        async function fetchSolvedExercises() {
            try {
                if (user) {
                    const solved = await getSolvedProblem(user.profile.sub);
                    setSolvedExercises(solved);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchSolvedExercises();
    }, [user]);

    if (!solvedExercises) {
        return <p>Cargando información...</p>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${day} de ${month} de ${year}, ${hours}:${minutes}:${seconds}`;
    };

    const data = {
        labels: ["Solved", "Tries"],
        datasets: [
            {
                label: "Exercises",
                data: [solvedExercises.Solved, solvedExercises.Tried],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        title: {
            display: true,
            text: "Exercises",
            fontSize: 20,
        },
        legend: {
            display: true,
            position: "right",
        },
    };

    if (solvedExercises.Solved === 0 && solvedExercises.Tried === 0) {
        return <p>No ha resuelto ejercicios aún.</p>;
    } else {
        return (
            <Fragment>
                <h2>Statistics</h2>
                <div className="card w-50">
                    <div className="card-body">
                        <h5 className="card-title">Ejercicios</h5>
                        <Bar data={data} options={options} />
                    </div>
                </div>
                {solvedExercises.ExercisesToProfileData && (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Fecha y Hora</th>
                                    <th>Lenguaje</th>
                                    <th>Completado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solvedExercises.ExercisesToProfileData.map((exercise, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><Link to={"/exercise/" + exercise.Id}>{exercise.Title}</Link></td>
                                        <td>{formatDate(exercise.DateTime)}</td>
                                        <td>{exercise.Language}</td>
                                        <td>{exercise.IsCompleted ? "Sí" : "No"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </Fragment>
        );
    }
}

export default StatisticsProfile;
