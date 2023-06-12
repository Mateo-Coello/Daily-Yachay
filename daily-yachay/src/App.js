import React, { Component } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import EventTabs from './EventViewer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  render() {
    const { modalIsOpen } = this.state;

    return (
      <div className="App">
        <button onClick={this.toggleModal}> Crear Evento</button>
        <EventForm isOpen={modalIsOpen} toggle={this.toggleModal} />
        <EventTabs/>
      </div>
    );
  }
}

export default App;
