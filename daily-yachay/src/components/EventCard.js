import React, { Component } from 'react';
import '../styles/event-card.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "./Comments.js";
import { Nav, NavItem, NavLink, TabContent, TabPane, Modal } from "reactstrap";
import { format } from "date-fns";
import CoversServices from '../services/covers.services';


class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: false,
      register: false,
      registerButtonText: "Inscribirse",
      activeTab: "1",
      isEventOpen: false,
    };
  }

  handleUpdate = (property, value) => {
    this.setState({
      [property]: value,
    });
  };

  toggleEventModal = () => {
    this.setState((prevState) => ({
      isEventOpen: !prevState.isEventOpen,
    }));
  };

  render() {

    const { reminder, register, registerButtonText, activeTab, isEventOpen } =
    this.state;

    const {
      eventID,
      eventTitle,
      eventOrganizer,
      eventExhibitor,
      eventDate,
      eventStartTime,
      eventEndTime,
      eventLocation,
      eventSummary,
      eventCoverPath,
      user,
    } = this.props;

    console.log(this.props);
    return (
      <div className="event-container" onClick={() => this.toggleEventModal()}>
        <h1>{eventTitle}</h1>

        <div className="content-left">
          <h2>Organizador: {eventOrganizer}</h2>
          <h2>Expositor: {eventExhibitor}</h2>
          <h2>Lugar: {eventLocation}</h2>
          <h2>Fecha: {format(eventDate, "dd/MM/yyyy")}</h2>

          <div className="event-options">
            <h2>
              Hora: {eventStartTime.toLocaleTimeString("es-EC")} -{" "}
              {eventEndTime.toLocaleTimeString("es-EC")}
            </h2>
            {eventDate >= new Date() && eventStartTime > new Date() ? (
              <div className="event-options">
                <button
                  onClick={() => this.handleUpdate("reminder", !reminder)}
                  className={
                    reminder ? "reminder-button active" : "reminder-button"
                  }
                >
                  <FontAwesomeIcon icon={faBell} />
                </button>
                <button
                  onClick={() => this.handleUpdate("register", !register)}
                  className={
                    register ? "register-button active" : "register-button"
                  }
                >
                  {registerButtonText}
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <Modal
          isOpen={isEventOpen}
          toggle={this.toggleEventModal}
          size="xl"
          centered
        >
          <div className="event-modal">
            <div className="event-modal-information">
              <h1>{eventTitle}</h1>
              <Nav justified tabs className="tabs">
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => this.setState({ activeTab: "1" })}
                  >
                    Detalles
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => this.setState({ activeTab: "2" })}
                  >
                    Descripción
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => this.setState({ activeTab: "3" })}
                  >
                    Comentarios
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="w-100 mt-2">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div className="content-left">
                      <h2>Organizador: {eventOrganizer}</h2>
                      <h2>Expositor: {eventExhibitor}</h2>
                      <h2>Lugar: {eventLocation}</h2>
                      <h2>Fecha: {format(eventDate, "dd/MM/yyyy")}</h2>
                    </div>

                    <div className="event-options">
                      <h2>
                        Hora: {eventStartTime.toLocaleTimeString("es-EC")} -{" "}
                        {eventEndTime.toLocaleTimeString("es-EC")}
                      </h2>
                      {eventDate >= new Date() &&
                      eventStartTime > new Date() ? (
                        <div className="event-options">
                          <button
                            onClick={() =>
                              this.handleUpdate("reminder", !reminder)
                            }
                            className={
                              reminder
                                ? "reminder-button active"
                                : "reminder-button"
                            }
                          >
                            <FontAwesomeIcon icon={faBell} />
                          </button>
                          <button
                            onClick={() =>
                              this.handleUpdate("register", !register)
                            }
                            className={
                              register
                                ? "register-button active"
                                : "register-button"
                            }
                          >
                            {registerButtonText}
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <p>{eventSummary}</p>
                  </TabPane>
                  <TabPane tabId="3">
                    <CommentsSection eventID={eventID} user={user} />
                  </TabPane>
                </TabContent>
              </div>
            </div>
            <div style={{width: "55%"}}>
              <img src={eventCoverPath} alt="/images/yachay.jpg" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default EventCard;
