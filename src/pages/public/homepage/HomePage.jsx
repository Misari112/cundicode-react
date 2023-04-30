import React, { useState, useEffect } from 'react';
//import '../../../styles/style.css';
import { getAuthenticatedUser } from '../../../config/ConfigIdentity';
import Navigator from '../../../components/Navigator';

const HomePage = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function getUser() {
      const user = await getAuthenticatedUser();
      setUser(user);
    }
    getUser();
  }, []);

  return (
    <div className='homepage'>
      <Navigator />
    </div>
  );
};

export default HomePage;
