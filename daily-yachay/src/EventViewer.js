import React, { useState } from 'react';
import './bootstrap/css/bootstrap.min.css';
import './styles/main.css'
import './styles/tabs.css';
import TabButton from './components/TabButton'
import { PreviousEventCard, EventCard } from './components/EventCard';

const EventTabs = () => {

  const [tab, setTab] = useState(2);
  const [clickedButton, setClickedButton] = useState(2);
  
  const handleClick = (buttonId) => {
    setTab(buttonId);
    setClickedButton(buttonId);
  }

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="col-7 event-visualizer">

        <div className="d-flex tab-buttons">
          <TabButton id={1} handleClick={handleClick} clickedButton={clickedButton} text='Previous Events' />
          <TabButton id={2} handleClick={handleClick} clickedButton={clickedButton} text='Today Events' />
          <TabButton id={3} handleClick={handleClick} clickedButton={clickedButton} text='Future Events' />
        </div>

        <div className='section-separator'></div>

        <div className={tab === 1 ? 'show-content' : 'content'}>
          <PreviousEventCard
            eventTitle="Club de Japones"
            eventLocation="I-102"
            eventSummary="Primera Reunion del Club de Japones"
            eventCoverPath="/images/yachay.jpg" />
          <PreviousEventCard
            eventTitle="Club de Japones"
            eventLocation="I-102"
            eventSummary="Primera Reunion del Club de Japones"
            eventCoverPath="/images/yachay.jpg" />
        </div>
        <div className={tab === 2 ? 'show-content' : 'content'}>
          <EventCard
            eventTitle="Club de Japones"
            eventLocation="I-102"
            eventSummary="Primera Reunion del Club de Japones"
            eventCoverPath="/images/yachay.jpg"
          />
        </div>
        <div className={tab === 3 ? 'show-content' : 'content'}>
          <EventCard
            eventTitle="Club de Ruso"
            eventLocation="I-202"
            eventSummary="Primera Reunion del Club de Ruso"
            eventCoverPath="/images/yachay.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default EventTabs;