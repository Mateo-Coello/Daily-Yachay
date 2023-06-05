import './App.css';
import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventTabs from './EventViewer';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className="App">
      <button onClick={toggleModal}> Crear Evento</button>

      <EventForm isOpen={modalIsOpen} toggle={toggleModal} />

      <EventTabs/>
    </div>
  );
}

export default App;
