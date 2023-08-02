import React, { Component } from 'react';
import "./styles/search-bar.css";
import "./styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import EventServices from "./services/events.services";
import EventViewer from "./components/EventViewer";
import LoginPage from "./components/Login";
import MenuBar from "./components/MenuBar";
import UserProfile from "./components/UserProfile";
import axios from "axios";

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loginModalIsOpen: false,
      eventViewerIsOpen: true,
      menuBarClickedButton: 1,
      menuBarModalIsOpen: false,
      createEventModalIsOpen: false,
      user:null,
      userProfileIsOpen: false,
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

  static baseURL = process.env.REACT_APP_BACKEND_HOST;

  // Automatic auth user
  logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(false);
  };

  componentDidMount() {
    const tokenCookie = document.cookie.split("; ").find(cookie => cookie.startsWith("token="));
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    


    axios.post(`${App.baseURL}/google/login`)
      .then(response => {
        this.setState((prevState) => ({
          user: response.data,
        }));
        console.log(this.state.user);
      })
      .catch(error => {
        console.log("Error al obtener los datos del usuario:", error);
      });
    } 

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) 
        this.logout(); 
        return Promise.reject(error);
      }
    );
  }

  
  
  toggleCreateEventModal = () => {
    this.setState((prevState) => {
      const {
        createEventModalIsOpen,
        menuBarClickedButton,
        menuBarModalIsOpen,
      } = prevState;
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

  handleHomeButton = () => {
    this.setState((prevState) => {
      if (!prevState.eventViewerIsOpen) {
        return {
          menuBarClickedButton: 1,
          eventViewerIsOpen: true,
          menuBarModalIsOpen: false,
          userProfileIsOpen: false,
        };
      } else if (prevState.eventViewerIsOpen) {
        return {
          menuBarClickedButton: 1,
          menuBarModalIsOpen: false,
          showFilteredEvents: false,
          userProfileIsOpen: false,
        };
      }
    });
  };

  handleProfileButton = () => {
    this.setState((prevState) => ({
      userProfileIsOpen: true,
      menuBarClickedButton: 4,
      menuBarModalIsOpen: false,
      eventViewerIsOpen: false,
    }));
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
      const filteredEvents = await EventServices.getEventsByFilters(
        searchFilters
      );
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
      menuBarClickedButton,
      menuBarModalIsOpen,
      eventViewerIsOpen,
      showFilteredEvents,
      filteredEvents,
      userProfileIsOpen,
      user,
    } = this.state;
    return (
      <div className="App">
        <div className="App-topbar">
          <h1 className="App-title">Daily Yachay</h1>

          <div className="App-topbar-buttons">
            <LoginPage/>
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
            handleProfileButton={this.handleProfileButton}
            user={user}
          />
        </div>

        {eventViewerIsOpen ? (
          <EventViewer
            showFilteredEvents={showFilteredEvents}
            filteredEvents={filteredEvents}
            user={user}
          />
        ) : null}

        {userProfileIsOpen ? <UserProfile /> : null}
      </div>
    );
  }
}

export default App;
