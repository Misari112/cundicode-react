import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { GetExercises } from "../../../services/ExercisesService";
import Navigator from "../../../components/Navigator";

function ExercisesPage() {
  const exercises = GetExercises();

  return (
    <Fragment>
      <Navigator />
      <div className="container mt-4">
        <h1>Exercises</h1>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty Level</th>
                <th>Categories</th>
                <th>Last Update</th>
                <th>Get</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((item) => (
                <tr key={item.Id}>
                  <td>{item.Title}</td>
                  <td>{item.DifficultyLevel}</td>
                  <td>{item.Categories}</td>
                  <td>{item.LastUpdated}</td>
                  <td>
                    <Link to={"/exercise/" + item.Id} className="btn btn-primary">
                      Exercise {item.Id}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ExercisesPage;
