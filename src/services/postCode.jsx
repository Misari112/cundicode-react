import React, { useState } from 'react';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Nombre: ${nombre}, Edad: ${edad}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label htmlFor="edad">Edad:</label>
        <input type="text" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
