import React, { Component } from 'react';
import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import EventForm from './components/EventForm';
import EventTabs from "./components/EventViewer";
import Login from "./components/login";
import SearchBar from './components/search-bar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createEventModalIsOpen: false,
      loginModalIsOpen: false
    };
  }

  toggleCreateEventModal = () => {
    this.setState((prevState) => ({
      createEventModalIsOpen: !prevState.createEventModalIsOpen
    }));
  };

  toggleLoginModal = () => {
    this.setState((prevState) => ({
      loginModalIsOpen: !prevState.loginModalIsOpen
    }));
  };

  handleSearch = (selectedCriteria, searchQuery, startDate, endDate) => {
    // Lógica de búsqueda aquí
    console.log("Search criteria:", selectedCriteria);
    console.log("Search query:", searchQuery);
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
  };
  

  render() {
    const { createEventModalIsOpen, loginModalIsOpen } = this.state;
    

    return (
      <div className="App">
        <div className='App-topbar'>
          <h1>Daily Yachay</h1>
          <SearchBar onSearch={this.handleSearch} /> 

          <div className='App-topbar-buttons'>
            <button className='create-event-button' onClick={this.toggleCreateEventModal}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {createEventModalIsOpen && <EventForm isOpen={createEventModalIsOpen} toggle={this.toggleCreateEventModal} />}
            <button className="profile-button" onClick={this.toggleLoginModal}>
              <FontAwesomeIcon icon={faUser}/>
            </button>
            {loginModalIsOpen && <Login isOpen={loginModalIsOpen} toggle={this.toggleLoginModal} />}
          </div>
        </div>
        <EventTabs/>
      </div>
    );
  }
}

export default App;
