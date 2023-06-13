import React, { Component } from 'react';
import '../styles/event-card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import CommentsSection from './Comments.js'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: false,
      register: false,
      registerButtonText: 'Inscribirse',
      activeTab: '1'
    };
  }

  handleReminder = (reminder) => {
    this.setState({ reminder });
  }

  handleRegister = (register) => {
    this.setState({ register });
  }

  render() {
    const {
      eventID = '0',
      eventTitle,
      eventOrganizer,
      eventExhibitor = 'Unknown',
      eventDate,
      eventStartTime,
      eventEndTime,
      eventLocation,
      eventSummary,
      eventCoverPath
    } = this.props;

    const { reminder, register, registerButtonText, activeTab } = this.state;

    return (
      <div className='event-container'>
        <div className='event-information'>
          <h1>{eventTitle}</h1>
          <Nav justified tabs className='tabs'>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active ' : ''}
                onClick={() => this.setState({ activeTab: '1' })}
              >
                Información
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active ' : ''}
                onClick={() => this.setState({ activeTab: '2' })}
              >
                Detalles
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active ' : ''}
                onClick={() => this.setState({ activeTab: '3' })}
              >
                Comentarios
              </NavLink>
            </NavItem>
          </Nav>
          <div className='w-100 mt-2'>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <div className='content-left'>
                  <h2>Organizador: {eventOrganizer}</h2>
                  <h2>Expositor: {eventExhibitor}</h2>
                  <h2>Lugar: {eventLocation}</h2>
                  <h2>Fecha: {eventDate.toLocaleDateString('es-EC')}</h2>
                </div>
        
                <div className='event-options'>
                  <h2>Hora: {eventStartTime.toLocaleTimeString('es-EC')} - {eventEndTime.toLocaleTimeString('es-EC')}</h2>
                  {eventDate >= new Date() &&
                   eventStartTime > new Date() ? (
                    <div className='event-options'>
                      <button
                        onClick={() => this.handleReminder(!reminder)}
                        className={reminder ? 'reminder-button active' : 'reminder-button'}
                      >
                        <FontAwesomeIcon icon={faBell} />
                      </button>
                      <button
                        onClick={() => this.handleRegister(!register)}
                        className={register ? 'register-button active' : 'register-button'}
                      >
                        {registerButtonText}
                      </button>
                    </div>
                  ) : null}
                </div>

              </TabPane>
              <TabPane tabId='2'>
                <p>{eventSummary}</p>
              </TabPane>
              <TabPane tabId='3'>
                <CommentsSection eventID={eventID}/>
              </TabPane>
            </TabContent>
          </div>
        </div>
        <img src={eventCoverPath} alt="/images/yachay.jpg" />
      </div>
    );
  }
}

export default EventCard;

