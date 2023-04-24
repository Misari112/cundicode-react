import axios from 'axios';
import { useState, useEffect } from 'react';

function WeatherResponse(props) {
  const token = props.access_token;
  const [responses, setResponses] = useState('');

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get('https://localhost:7254/WeatherForecast', config)
      .then((response) => {
        setResponses(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        // Manejar el error aquí
      });
  }, [token]);

  return (
    <div>
      Token: {props.access_token}
      <p>{responses}</p>
    </div>
  );
}

export default WeatherResponse;
