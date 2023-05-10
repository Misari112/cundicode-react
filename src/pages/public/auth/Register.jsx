import { useState } from "react";
import axios from "axios";
import LoginButton from "./Login";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  title: {
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
  },
  input: {
    marginTop: "0.25rem",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  },
};

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
    <div style={styles.container}>
      <h2 style={styles.title}>Registro</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre de usuario:
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Número de teléfono:
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Nombre completo:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Contraseña:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button} className="mb-2">
          Registrarse
        </button>
        <Link to="/" className="btn btn-success mb-2">
          Home
        </Link>
        <LoginButton/>
        
      </form>
    </div>
  );
};

export default Register;
