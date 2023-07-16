import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css";

function Login({ isOpen, toggle }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const database = [
    {
      username: "user1",
      password: "pass1",
      email: "user1@example.com",
    },
    {
      username: "user2",
      password: "pass2",
      email: "user2@example.com",
    },
  ];

  const errors = {
    uname: "Usuario inválido",
    pass: "Contraseña inválida",
    email: "Correo electrónico inválido",
    repeatPassword: "Las contraseñas no coinciden",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uname, pass } = event.target.elements;

    const userData = database.find(
      (user) => user.username === uname.value || user.email === uname.value
    );

    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const { username, email, password, repeatPassword } = event.target.elements;

    if (password.value !== repeatPassword.value) {
      setErrorMessages({
        name: "repeatPassword",
        message: errors.repeatPassword,
      });
      return;
    }

    // Resto de la lógica de registro...
  };

  const handleToggleForm = () => {
    setIsRegistering((prevIsRegistering) => !prevIsRegistering);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === repeatPassword);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const renderForm = () => {
    if (isRegistering) {
      return (
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label>Usuario</label>
            <input type="text" name="username" required />
            {renderErrorMessage("username")}
          </div>
          <div className="input-container">
            <label>Correo electrónico</label>
            <input type="email" name="email" required />
            {renderErrorMessage("email")}
          </div>
          <div className="input-container">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {renderErrorMessage("password")}
          </div>
          <div className="input-container">
            <label>Repetir Contraseña</label>
            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              required
            />
            {renderErrorMessage("repeatPassword")}
            {!passwordMatch && (
              <div className="error">{errors.repeatPassword}</div>
            )}
          </div>
          <div className="button-container">
            <input
              type="submit"
              value="Registrarse"
              className="btn btn-success"
            />
          </div>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Usuario o Correo electrónico</label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Contraseña</label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input
              type="submit"
              value="Iniciar sesión"
              className="btn btn-success"
            />
          </div>
          <div className="google-login-container">
            <GoogleLogin
              clientId="tu-client-id-de-google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              buttonText="Iniciar sesión con Google"
            />
          </div>
        </form>
      );
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleGoogleSuccess = (response) => {
    // Manejar el inicio de sesión exitoso de Google aquí
    console.log("Inicio de sesión de Google exitoso:", response);
  };

  const handleGoogleFailure = (error) => {
    // Manejar el inicio de sesión fallido de Google aquí
    console.error("Error en el inicio de sesión de Google:", error);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        {isRegistering ? "Registrarse" : "Iniciar sesión"}
      </ModalHeader>
      <ModalBody>
        {isSubmitted ? (
          <div>Usuario conectado correctamente</div>
        ) : (
          renderForm()
        )}
      </ModalBody>
      <ModalFooter>
        <div className="register-link">
          {isRegistering ? (
            <span>
              ¿Ya tienes una cuenta?{" "}
              <a href="#" onClick={handleToggleForm}>
                Iniciar sesión
              </a>
            </span>
          ) : (
            <span>
              ¿No tienes una cuenta?{" "}
              <a href="#" onClick={handleToggleForm}>
                Registrarse
              </a>
            </span>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default Login;
