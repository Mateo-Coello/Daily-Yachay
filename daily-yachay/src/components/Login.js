import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EventServices from "../services/events.services";
import { ReactComponent as GoogleLogo } from '../assets/google.svg';
import "../styles/login.css";

const LoginPage = ({ isOpen, toggle }) => {



  const handleGoogleLogin = () => {
    const googleUrl = EventServices.getGoogleUrl("from"); 
    window.location.href = googleUrl;
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Iniciar sesión</ModalHeader>
      <ModalBody>

            <div className="button-container">
              <button onClick={handleGoogleLogin} className="btn btn-success">
                <GoogleLogo className="google-logo" /> Iniciar sesión o registrarse con Google
              </button>
            </div>
      </ModalBody>
    </Modal>
  );
}

export default LoginPage;
