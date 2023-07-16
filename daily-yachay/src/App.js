import React, { Component } from 'react';
import "./styles/search-bar.css";
import "./styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import EventServices from "./services/events.services";
import EventForm from "./components/EventForm";
import EventViewer from "./components/EventViewer";
import Login from "./components/Login";
import MenuBar from "./components/MenuBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalIsOpen: false,
      eventViewerIsOpen: true,
      menuBarClickedButton: 0,
      menuBarModalIsOpen: false,
      createEventModalIsOpen: false,
      searchFilters: {
        title: "",
        organizer: "",
        category: "",
        location: "",
        endDate: "",
        startDate: "",
      },
      showFilteredEvents: false,
      filteredEvents: [],
    };
  }

  toggleCreateEventModal = () => {
    this.setState((prevState) => {
      const { createEventModalIsOpen, menuBarClickedButton, menuBarModalIsOpen } = prevState;
      let updatedMenuBarClickedButton = menuBarClickedButton;
      let updatedMenuBarModalIsOpen = menuBarModalIsOpen;
  
      if (!createEventModalIsOpen) {
        // Toggle the modal from false to true
        updatedMenuBarClickedButton = 3;
        updatedMenuBarModalIsOpen = false;
      } else {
        // Toggle the modal from true to false
        updatedMenuBarClickedButton = 0;
        updatedMenuBarModalIsOpen = false;
      }
  
      return {
        createEventModalIsOpen: !createEventModalIsOpen,
        menuBarClickedButton: updatedMenuBarClickedButton,
        menuBarModalIsOpen: updatedMenuBarModalIsOpen,
      };
    });
  };
 
  toggleLoginModal = () => {
    this.setState((prevState) => ({
      loginModalIsOpen: !prevState.loginModalIsOpen,
    }));
  };

  toggleMenuModal = (buttonId) => {
    this.setState((prevState) => {
      if (
        buttonId !== prevState.menuBarClickedButton &&
        !prevState.menuBarModalIsOpen
      ) {
        return {
          menuBarClickedButton: buttonId,
          menuBarModalIsOpen: !prevState.menuBarModalIsOpen,
        };
      } else if (
        buttonId !== prevState.menuBarClickedButton &&
        prevState.menuBarModalIsOpen
      ) {
        return {
          menuBarClickedButton: buttonId,
        };
      } else if (prevState.menuBarModalIsOpen) {
        return {
          menuBarClickedButton: 0,
          menuBarModalIsOpen: !prevState.menuBarModalIsOpen,
        };
      }
    });
  };

  handleHomeButton = (buttonId) => {
    this.setState((prevState) => {
      if (!prevState.eventViewerIsOpen) {
        return {
          menuBarClickedButton: buttonId,
          eventViewerIsOpen: true,
          menuBarModalIsOpen: false,
        };
      } else if (prevState.eventViewerIsOpen) {
        return {
          menuBarClickedButton: buttonId,
          menuBarModalIsOpen: false,
          showFilteredEvents: false,
        };
      }
    });
  };

  handleFilterValue = (filter, data) => {
    this.setState((prevState) => ({
      searchFilters: {
        ...prevState.searchFilters,
        [filter]: data,
      },
    }));
  };

  handleSearchByFilters = async () => {
    try {
      const { searchFilters } = this.state;
      const filteredEvents = await EventServices.getEventsByFilters(searchFilters);
      this.setState({
        filteredEvents,
        showFilteredEvents: true,
        menuBarModalIsOpen: false,
        // menuBarClickedButton: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      createEventModalIsOpen,
      loginModalIsOpen,
      menuBarClickedButton,
      menuBarModalIsOpen,
      eventViewerIsOpen,
      showFilteredEvents,
      filteredEvents,
    } = this.state;

    return (
      <div className="App">
        <div className="App-topbar">
          <h1>Daily Yachay</h1>

          <div className="App-topbar-buttons">
            {/* <button
              className="create-event-button"
              onClick={this.toggleCreateEventModal}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {createEventModalIsOpen && (
              <EventForm
                isOpen={createEventModalIsOpen}
                toggle={this.toggleCreateEventModal}
              />
            )} */}

            <button className="profile-button" onClick={this.toggleLoginModal}>
              <FontAwesomeIcon icon={faUser} />
            </button>
            {loginModalIsOpen && (
              <Login isOpen={loginModalIsOpen} toggle={this.toggleLoginModal} />
            )}
          </div>
        </div>

        <div className="col-3">
          <MenuBar
            menuModalIsOpen={menuBarModalIsOpen}
            clickedButton={menuBarClickedButton}
            createEventModalIsOpen={createEventModalIsOpen}
            handleHomeButton={this.handleHomeButton}
            toggleMenuModal={this.toggleMenuModal}
            toggleCreateEventModal={this.toggleCreateEventModal}
            searchFilters={this.state.searchFilters}
            handleFilterValue={this.handleFilterValue}
            handleSearchByFilters={this.handleSearchByFilters}
          />
        </div>

        {eventViewerIsOpen ? (
          <EventViewer
            showFilteredEvents={showFilteredEvents}
            filteredEvents={filteredEvents}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
