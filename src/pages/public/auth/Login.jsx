import userManager from '../../../config/ConfigIdentity';
import React, { Fragment, useEffect } from 'react';

function LoginPage() {
  useEffect(() => {
    async function signInAsync() {
      try {
        await userManager.signinRedirect();
      } catch (err) {
        console.error(err);
      }
    }

    signInAsync();
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

    </Fragment>

  );
}

export default LoginPage;