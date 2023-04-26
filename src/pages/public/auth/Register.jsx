import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://cundicode-identity-server.azurewebsites.net/api/Register", userData)
      .then((response) => {
        console.log(response);
        alert("¡Registro exitoso!");
      })
      .catch((error) => {
        console.error(error.response);
        alert("¡Error al registrar usuario!");
      });
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Número de teléfono:
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Nombre completo:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
