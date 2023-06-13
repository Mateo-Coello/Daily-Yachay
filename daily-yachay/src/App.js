import React, { Component } from 'react';
import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import EventForm from './components/EventForm';
import EventTabs from "./components/EventViewer";

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

        <div className='App-topbar'>
          <h1>Daily Yachay</h1>

          <div className='App-topbar-buttons'>
            <button className='create-event-button' onClick={this.toggleModal}> 
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <EventForm isOpen={modalIsOpen} toggle={this.toggleModal} />

            <img
              className="App-profile-picture"
              src="/images/default-profile-pic.jpg"
              alt="/images/default-profile-pic.jpg"
            />  
          </div>
        </div>

        <EventTabs/>
      </div>
    );
  }
}

export default App;
