import React, { useState } from 'react';
import '../styles/events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import CommentsSection from './Comments.js'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const PreviousEventCard = ({
  eventTitle,
  eventOrganizer,
  eventExhibitor = 'Unknown',
  eventLocation,
  eventStartHour,
  eventEndHour,
  eventSummary,
  eventCoverPath,
}) => {
  return (
    <div className='event-container'>
      <div className='event-information'>
        <h1>{eventTitle}</h1>
        <h2>Organizador: {eventOrganizer}</h2>
        <h2>Expositor: {eventExhibitor}</h2>
        <h2>Lugar: {eventLocation}</h2>
        <h2>Hora: {eventStartHour} - {eventEndHour}</h2>
        {/* <p>Informacion: {eventSummary}</p> */}
      </div>
      <img src={eventCoverPath} alt="/images/yachay.jpg" />
    </div>
  );
};

const EventCard = ({
  eventTitle,
  eventOrganizer,
  eventExhibitor = 'Unknown',
  eventLocation,
  eventStartHour,
  eventEndHour,
  eventSummary,
  eventCoverPath,
}) => {

  const [reminder, setReminder] = useState(false);
  const [register, setRegister] = useState(false);
  const registerButtonText = register ? 'Inscrito' : 'Inscribirse';
  const [activeTab, setActiveTab] = useState("1");

  const handleReminder = (reminder) => {
    setReminder(reminder);
  }

  const handleRegister = (register) => {
    setRegister(register);
  }

  return (
    <div className='event-container'>

      <div className='event-information'>

        <h1>{eventTitle}</h1>

        <Nav justified tabs className='tabs'>
          <NavItem>
            <NavLink
            className={activeTab === "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
            >
            Información
            </NavLink>
          </NavItem>

          <NavItem>
          <NavLink
            className={activeTab === "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
            >
            Detalles
            </NavLink>
          </NavItem>

          <NavItem>
          <NavLink
            className={activeTab === "3" ? "active" : ""}
            onClick={() => setActiveTab("3")}
            >
            Comentarios
            </NavLink>
          </NavItem>
        </Nav>

        <div style={{width: '100%', marginTop: '10px'}}>
          <TabContent activeTab={activeTab}>

            <TabPane tabId="1" >

              <div className='content-left'>
                <h2>Organizador: {eventOrganizer}</h2>
                <h2>Expositor: {eventExhibitor}</h2>
                <h2>Lugar: {eventLocation}</h2>
              </div>

              <div className='event-options' style={{ justifyContent: 'space-between', width: '100%' }}>
                <h2>Hora: {eventStartHour} - {eventEndHour}</h2>

                <div className='event-options'>
                  <button
                    onClick={() => handleReminder(!reminder)}
                    className={reminder ? 'reminder-button active' : 'reminder-button'}>
                    <FontAwesomeIcon icon={faBell} />
                  </button>

                  <button
                    onClick={() => handleRegister(!register)}
                    className={register ? 'register-button active' : 'register-button'}>
                    {registerButtonText}
                  </button>
                </div>
              </div>

            </TabPane>

            <TabPane tabId="2">
              <p>{eventSummary}</p>
            </TabPane>

            <TabPane tabId="3">
              <CommentsSection />
            </TabPane>

          </TabContent>

        </div>

      </div>

      <img src={eventCoverPath} alt="/images/yachay.jpg" />

    </div>
  );
};

export { PreviousEventCard, EventCard };
