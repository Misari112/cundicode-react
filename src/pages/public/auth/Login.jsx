import React, { useState } from 'react';
import userManager from '../../../config/ConfigIdentity';

function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    try {
      await userManager.signinRedirect();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <button onClick={handleLogin} disabled={isLoading} className='nav-link active bg-dark btn'>
      {isLoading ? 'Cargando...' : 'Iniciar sesión'}
    </button>
  );
}

export default LoginButton;
