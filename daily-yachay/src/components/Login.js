import React, { useEffect, useState } from "react";
import "../styles/login.css";
import googleOneTap from "google-one-tap";

const options = {
  client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "use",
};

const LoginPage = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    if (!loginData) {
      googleOneTap(options, async (response) => {
        const res = await fetch("http://localhost:4000/oauth/google-login", {
          method: "POST",
          body: JSON.stringify({
            token: response.credential,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setLoginData(data);
        localStorage.setItem("loginData", JSON.stringify(data));
      });
    }
  }, [loginData]);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div className="button-container">
      {loginData ? (
        <div>
          <h3>
            Welcome "{loginData.firstName}"! You are logged in as {loginData.email}
          </h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>Not logged in</h3>
          
        </div>
      )}
    </div>
  );
};

export default LoginPage;
