import React, { useEffect, Fragment } from 'react';
import userManager from '../../../config/ConfigIdentity';

const Callback = () => {
  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
      console.log();
      // La autenticación ha sido exitosa, redirigir al usuario a la página de inicio
      window.location.replace('/');
    });
  }, []);

  return (
    <Fragment>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="card me-1">
          <div className="card-body">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="card me-1">
          <div className="card-body">
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="card me-1">
          <div className="card-body">
            <div className="spinner-grow text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>

    </Fragment>);
};

export default Callback;
