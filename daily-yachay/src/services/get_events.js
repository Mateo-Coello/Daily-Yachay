import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
// import { getEventCover } from './covers';


async function getEventsByRoute(route, currentDate) {
  try {
    const response = await axios.get(`http://localhost:4000/events/${route}/:{"2022-07-04"}`);
    // :${currentDate}
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

const EventList = ({ route }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);

    getEventsByRoute(route, currentDate)
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [route, currentDate]);

  return (
    <div>
      {events.map(event => (
        <EventCard
          key={event.id}
          eventTitle={event.title}
          eventOrganizer={event.organizer}
          eventExhibitor={event.exhibitors}
          eventLocation={event.location}
          eventDate={new Date(event.date)}
          eventStartTime={new Date(`2000-01-01 ${event.start_hour}`)}
          eventEndTime={new Date(`2000-01-01 ${event.end_hour}`)}
          eventSummary={event.description}
          eventCoverPath="/images/yachay.jpg"
        />
      ))}
    </div>
  );
};

export default EventList;












