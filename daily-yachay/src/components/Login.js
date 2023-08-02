import React, { useEffect, useState } from "react";
import "../styles/login.css";
import googleOneTap from "google-one-tap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const options = {
  client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "use",
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saveCredentialToCookie = async () => {
      googleOneTap(options, async (response) => {
        const token = response.credential;

        try {
          document.cookie = `token=${token}; path=/`;
          window.location.reload(false);

          const res = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          });

          const data = await res.json();
          console.log(data);
          setIsLoggedIn(true); // Setear el estado a true cuando el usuario inicie sesión
        } catch (error) {
          console.error("Error al registrar el usuario:", error.message);
        }
      });
    };

    const tokenCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="));

    if (tokenCookie) {
      // Si la cookie existe, setear el estado a true
      setIsLoggedIn(true);
    } else {
      saveCredentialToCookie();
    }
  }, []);

  const handleOpenOneTap = () => {
    // Función para abrir el Google One Tap
    googleOneTap(options, async (response) => {
      const token = response.credential;

      try {
        // Guardar el token en una cookie con una duración de sesión
        document.cookie = `token=${token}; path=/`;

        // Realizar una solicitud POST a la ruta '/create_user/new' para registrar el usuario si no existe
        const res = await fetch("http://localhost:4000/google/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado Authorization
          },
          body: JSON.stringify({ token }), // Enviar el token como parte del cuerpo de la solicitud
        });

        const data = await res.json();
        console.log(data); // Puedes hacer algo con la respuesta si lo deseas
        setIsLoggedIn(true); // Setear el estado a true cuando el usuario inicie sesión
      } catch (error) {
        console.error("Error al registrar el usuario:", error.message);
      }
    });
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(false);
  };

  return (
    <div className="button-container">
      {isLoggedIn ? (
        <button className="custom2-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Salir
        </button>
      ) : (
        <button className="custom-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
        </button>
      )}
    </div>
  );
};

export default LoginPage;
