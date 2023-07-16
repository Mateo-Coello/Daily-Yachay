import React, { Component } from "react";
import "../bootstrap/css/bootstrap.min.css";
import "../styles/menu-bar.css";
import SearchBar from "./SearchBar";
import EventForm from "./EventForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

class MenuBar extends Component {
  
  render() {
    const {
      menuModalIsOpen,
      clickedButton,
      handleHomeButton,
      createEventModalIsOpen,
      toggleCreateEventModal,
      toggleMenuModal,
      searchFilters,
      handleFilterValue,
      handleSearchByFilters,
    } = this.props;

    return (
      <div className={menuModalIsOpen ? "menu-bar active" : "menu-bar"}>
        <div className="menu-buttons">
          <button
            id={1}
            className={
              clickedButton === 1 ? "menu-button active" : "menu-button"
            }
            onClick={() => handleHomeButton(1)}
          >
            <span style={{ width: "30px", height: "30px" }}>
              <FontAwesomeIcon icon={faHouse} />
            </span>
            <span style={{ marginLeft: "10px" }}>Home</span>
          </button>

          <button
            id={2}
            className={
              clickedButton === 2 ? "menu-button active" : "menu-button"
            }
            onClick={() => toggleMenuModal(2)}
          >
            <span style={{ width: "30px", height: "30px" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <span style={{ marginLeft: "10px" }}>Search</span>
          </button>

          <button
            id={3}
            className={
              clickedButton === 3 ? "menu-button active" : "menu-button"
            }
            onClick={() => toggleCreateEventModal()}
          >
            <span style={{ width: "30px", height: "30px" }}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span style={{ marginLeft: "10px" }}>Create</span>
          </button>

          <button
            id={4}
            className={
              clickedButton === 4 ? "menu-button active" : "menu-button"
            }
            onClick={() => toggleMenuModal(4)}
          >
            <img
              src="/images/default-profile-pic.jpg"
              alt="/images/default-profile-pic.jpg"
            />
            <span style={{ marginLeft: "10px" }}>Profile</span>
          </button>

          <EventForm
            isOpen={createEventModalIsOpen}
            toggle={toggleCreateEventModal}
          />

          {menuModalIsOpen && (
            <div className={menuModalIsOpen ? "drawer open" : "drawer"}>
              <div className="drawer-content">
                {clickedButton === 2 && (
                  <>
                    <h3>Filtrado de Eventos</h3>
                    <SearchBar
                      searchFilters={searchFilters}
                      handleFilterValue={handleFilterValue}
                      handleSearchByFilters={handleSearchByFilters}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MenuBar;
