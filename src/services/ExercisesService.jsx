import { useState, useEffect } from 'react';
import axios from 'axios';

export function GetExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await axios.get('https://cundicode-ms-practice-api.azurewebsites.net/api/Codes');
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
      const response = await axios.get('https://cundicode-ms-practice-api.azurewebsites.net/api/Codes/' + id);
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
  axios.post("https://cundicode-ms-practice-api.azurewebsites.net/api/Codes/add", newExercise, {
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
    language: "java",
    version: "4"
  };
  return await axios.post('https://cundicode-ms-practice-api.azurewebsites.net/api/Codes', requestBody, {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('La compilación fue:', response.data);
      return response.data.output;
    })
    .catch(error => {
      console.error('Hubo un error:', error);
      return "Error en la compilación";
    });
}

export async function CompileExamples(eCase) {
  console.log("enviando servicio");
  const requestBody = {
    id: eCase.id,
    script: eCase.script,
    language: "java",
    version: "4"
  };
  return await axios.post('https://cundicode-ms-practice-api.azurewebsites.net/api/Codes/ExecuteExamples', requestBody, {
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

export async function CompileTestCases(eCase) {
  console.log("enviando servicio");
  const requestBody = {
    id: eCase.id,
    script: eCase.script,
    language: "java",
    version: "4",
    idUser: eCase.iduser
  };
  return await axios.post('https://localhost:7253/api/Codes/ExecuteTestCases', requestBody, {
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