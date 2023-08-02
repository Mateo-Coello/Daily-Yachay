import React, { useEffect } from "react";
import "../styles/login.css";
import googleOneTap from "google-one-tap";

const options = {
  client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "use",
};

const LoginPage = () => {

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
              "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ token }), 
          });

          const data = await res.json();
          console.log(data); 
        } catch (error) {
          console.error("Error al registrar el usuario:", error.message);
        }
      });
    };

    const tokenCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="));

    if (!tokenCookie) {
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
            "Authorization": `Bearer ${token}` // Incluir el token en el encabezado Authorization
          },
          body: JSON.stringify({ token }), // Enviar el token como parte del cuerpo de la solicitud
        });

        const data = await res.json();
        console.log(data); // Puedes hacer algo con la respuesta si lo deseas
      } catch (error) {
        console.error("Error al registrar el usuario:", error.message);
      }
    });
  };


  const handleLogout = () => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload(false);  
  };

  return (
    <div className="button-container">
      <button onClick={handleOpenOneTap}>Open Google One Tap</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginPage;
