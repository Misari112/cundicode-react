import { useState, useEffect } from 'react';
import axios from 'axios';

const urlBase = process.env.REACT_APP_MS_PRACTICE_URL_BASE;
export function GetExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get(urlBase + '/Codes');
      setExercises(response.data);
    };
    fetchExercises();
  }, []);

  return exercises;
}

export function GetExercise(id) {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    const fetchExercise = async () => {
      const response = await axios.get(urlBase + '/Codes/' + id);
      const object = response.data;
      const examples = JSON.parse(object.Examples);
      object.Examples = examples;
      setExercise(object);
    };
    fetchExercise();
  }, [id]);

  return exercise;
}

export function SetNewExercise(newExercise) {
  console.log("newExercise");
  console.log(newExercise);
  axios.post(urlBase + "/Codes/add", newExercise, {
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


export async function CompileCustomCode(eCase) {
  const requestBody = {
    script: eCase.script,
    stdin: eCase.stdin,
    language: eCase.language,
    version: eCase.version
  };
  console.log(requestBody)
  return await axios.post(urlBase + '/Codes', requestBody, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('La compilación fue:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Hubo un error:', error);
      return "Error en la compilación";
    });
}

export async function compileExamples(eCase) {
  const { id, script, language, version } = eCase;

  try {
    console.log(`Enviando servicio: Id: ${id}, Lenguaje: ${language}, Versión: ${version}`);
    
    const requestBody = {
      id,
      script,
      language,
      version
    };
    
    const response = await axios.post(urlBase + '/Codes/ExecuteExamples', requestBody, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('La compilación fue:', response.data);
    return response.data;
  } catch (error) {
    console.error('Hubo un error:', error);
    return "Error en la compilación";
  }
}

export async function CompileTestCases(eCase) {
  const requestBody = {
    id: eCase.id,
    script: eCase.script,
    language: eCase.language,
    version: eCase.version,
    idUser: eCase.idUser
  };
  return await axios.post(urlBase + '/Codes/ExecuteTestCases', requestBody, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('La compilación fue:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Hubo un error:', error);
      return "Error en la compilación";
    });
}

export async function getSolvedProblem(userId) {
  const url = urlBase + '/Codes/solved/' + userId;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept': '*/*'
      }
    });
    
    console.log('La respuesta fue:', response.data);
    return response.data;
  } catch (error) {
    console.error('Hubo un error:', error);
    return "Error al obtener la información";
  }
}