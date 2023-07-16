import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';


// Obtener previos/hoy/futuros
async function getEventsByRoute(route, currentDate) {
  try {
    const response = await axios.get(`http://localhost:4000/events/${route}/:${currentDate}`);
    // 
    return response.data;
  
  } catch (error) {
    throw new Error(error.message);
  }
}

// Funcion renderizadora usando el componente Eventcard
export const EventList = ({ route }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    console.log(formattedDate)
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
          eventID={event.id}
          eventTitle={event.title}
          eventOrganizer={event.organizer}
          eventExhibitor={event.exhibitors}
          eventLocation={event.location}
          eventDate={new Date(event.date + 'T00:00:00')}
          eventStartTime={new Date(`2000-01-01 ${event.start_hour}`)}
          eventEndTime={new Date(`2000-01-01 ${event.end_hour}`)}
          eventSummary={event.description}
          eventCoverPath="/images/yachay.jpg"
        />
      ))}
    </div>
  );
};

// async function getEventsByFilters({title, organizer, category, location, endDate, startDate}) {
//   try {
//     const response = await axios.get(`http://127.0.0.1:4000/events/filters/ttl=${title}/org=${organizer}/cat=${category}/loc=${location}/startD=${startDate}/endD=${endDate}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export const eventListByFilters = (searchFilters) => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     getEventsByFilters(searchFilters)
//       .then(data => {
//         setEvents(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, searchFilters);

//   return (
//     <div>
//       {events.map(event => (
//         <EventCard
//           key={event.id}
//           eventID={event.id}
//           eventTitle={event.title}
//           eventOrganizer={event.organizer}
//           eventExhibitor={event.exhibitors}
//           eventLocation={event.location}
//           eventDate={new Date(event.date + 'T00:00:00')}
//           eventStartTime={new Date(`2000-01-01 ${event.start_hour}`)}
//           eventEndTime={new Date(`2000-01-01 ${event.end_hour}`)}
//           eventSummary={event.description}
//           eventCoverPath="/images/yachay.jpg"
//         />
//       ))}
//     </div>
//   );
// };

async function getMappedEventsByOrganizer(organizer) {
  try {
    const response = await axios.get(`http://localhost:4000/events/organizer/${organizer}`);
    const events = response.data;

    const mappedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      organizer: event.organizer,
      exhibitors: event.exhibitors,
      location: event.location,
      date: new Date(event.date + 'T00:00:00'),
      startTime: new Date(`2000-01-01 ${event.start_hour}`),
      endTime: new Date(`2000-01-01 ${event.end_hour}`),
      summary: event.description
    }));

    return mappedEvents;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const EventList_Organizer = ({ organizer }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getMappedEventsByOrganizer(organizer)
      .then(mappedEvents => {
        setEvents(mappedEvents);
      })
      .catch(error => {
        console.error(error);
      });
  }, [organizer]);

  return (
    <div>
      {events.map(event => (
        <EventCard
          key={event.id}
          eventID={event.id}
          eventTitle={event.title}
          eventOrganizer={event.organizer}
          eventExhibitor={event.exhibitors}
          eventLocation={event.location}
          eventDate={event.date}
          eventStartTime={event.startTime}
          eventEndTime={event.endTime}
          eventSummary={event.summary}
          eventCoverPath="/images/yachay.jpg"
        />
      ))}
    </div>
  );
};

