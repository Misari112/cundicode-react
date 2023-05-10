import { useState, useEffect } from 'react';
import axios from 'axios';

const urlBase = process.env.REACT_APP_MS_PRACTICE_URL_BASE;
export function GetResources() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            const response = await axios.get(urlBase + '/Resources');
            setResources(response.data);
        };
        fetchResources();
    }, []);

    return resources;
}
export function GetResource(id) {
  const [resource, setResource] = useState([]);

  useEffect(() => {
    const fetchResource = async () => {
      const response = await axios.get(urlBase + '/Resources/resource/' + id);
      const object = response.data;
      setResource(object);
    };
    fetchResource();
  }, [id]);

  return resource;
}
export function SetNewResource(newResource) {
    console.log("New Resource");
    console.log(newResource);
    axios.post(urlBase + "/Resources", newResource, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        alert("Agregado exitosamente!");
        return "Agregado";
      })
      .catch((error) => {
        console.error(error.response);
        alert("¡Error al registrar el ejercicio!");
        return "No ha sido agregado";
      });
  }