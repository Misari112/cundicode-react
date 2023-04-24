import React, { Fragment, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuthenticatedUser } from '../config/ConfigIdentity';
//Pages to route
import HomePage from '../pages/public/homepage/HomePage';
import LoginPage from '../pages/public/auth/Login';
import LogoutPage from '../pages/public/auth/Logout';
import Callback from '../pages/public/auth/Callback';
import EditorPage from '../pages/private/editor/EditorPage';
import RegisterForm from '../pages/public/auth/Register';
import PrivateRoute from '../components/PrivateRouteI';
import ExercisesPage from '../pages/public/exercises/ExercisesPage';
import Exercise from '../pages/private/exercise/ExercisePage';
import NewExercise from '../pages/private/newExercise/NewExercisePage';

function RoutesI() {
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
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path='/exercises' element={<ExercisesPage />} />
        <Route
          path="//exercise/:id"
          element={
            <PrivateRoute isAuthenticated={user}>
              <Exercise />
            </PrivateRoute>
          } 
        />
        <Route
          path="/editor"
          element={
            <PrivateRoute isAuthenticated={user}>
              <EditorPage />
            </PrivateRoute>
          } 
        />
        <Route
          path="/NewExercise"
          element={
            <PrivateRoute isAuthenticated={user}>
              <NewExercise/>
            </PrivateRoute>
          } 
        />
        <Route path="/signup" element={<RegisterForm />} />
      </Routes>
    </Fragment>

  );
}

export default RoutesI;