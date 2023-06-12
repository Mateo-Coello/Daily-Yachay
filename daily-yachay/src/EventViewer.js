import React, { Component } from 'react';
import './bootstrap/css/bootstrap.min.css';
import './styles/main.css';
import './styles/tabs.css';
import TabButton from './components/TabButton';
import EventCard from './components/EventCard';

class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 2,
      clickedButton: 2
    };
  }

  handleClick = (buttonId) => {
    this.setState({
      tab: buttonId,
      clickedButton: buttonId
    });
  };

  render() {
    const { tab, clickedButton } = this.state;

    return (
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-7 event-visualizer">
          <div className="d-flex tab-buttons">
            <TabButton id={1} handleClick={this.handleClick} clickedButton={clickedButton} text='Previous Events' />
            <TabButton id={2} handleClick={this.handleClick} clickedButton={clickedButton} text='Today Events' />
            <TabButton id={3} handleClick={this.handleClick} clickedButton={clickedButton} text='Future Events' />
          </div>

          <div className='section-separator'></div>

          <div className={tab === 1 ? 'show-content' : 'content'}>
            <EventCard
              eventTitle="Club de Japones"
              eventLocation="I-102"
              eventDate= {new Date('2023-02-05')}
              eventStartTime= {new Date('2000-01-01 10:00')}
              eventEndTime= {new Date('2000-01-01 11:00')}
              eventSummary="Primera Reunion del Club de Japones"
              eventCoverPath="/images/yachay.jpg"
            />
            <EventCard
              eventTitle="Club de Japones"
              eventLocation="I-102"
              eventDate= {new Date('2023-03-25')}
              eventStartTime= {new Date('2000-01-01 11:00')}
              eventEndTime= {new Date('2000-01-01 12:00')}
              eventSummary="Primera Reunion del Club de Japones"
              eventCoverPath="/images/yachay.jpg"
            />
          </div>
          <div className={tab === 2 ? 'show-content' : 'content'}>
            <EventCard
              eventTitle="Club de Japones"
              eventLocation="I-102"
              eventDate= {new Date()}
              eventStartTime= {new Date('2000-01-01 15:00')}
              eventEndTime= {new Date('2000-01-01 16:00')}
              eventSummary="Primera Reunion del Club de Japones"
              eventCoverPath="/images/yachay.jpg"
            />
          </div>
          <div className={tab === 3 ? 'show-content' : 'content'}>
            <EventCard
              eventTitle="Club de Ruso"
              eventLocation="I-202"
              eventDate= {new Date('2023-07-03 00:00')}
              eventStartTime= {new Date('2023-07-03 13:00')}
              eventEndTime= {new Date('2023-07-03 15:00')}
              eventSummary="Primera Reunion del Club de Ruso"
              eventCoverPath="/images/yachay.jpg"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EventViewer;
