// import React, { Component } from "react";
// import "../bootstrap/css/bootstrap.min.css";
// import "../styles/event-viewer.css";
// import "../styles/tabs.css";
// import TabButton from "./TabButton";
// import { EventList } from "../services/events";

// class EventViewer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tab: 2,
//       clickedButton: 2,
//     };
//   }

//   handleClick = (buttonId) => {
//     this.setState({
//       tab: buttonId,
//       clickedButton: buttonId,
//     });
//   };

//   render() {
//     const { tab, clickedButton } = this.state;

//     return (
//       <div className="d-flex align-items-center justify-content-center">
//         <div className="col-7 event-viewer">
//           <div className="d-flex tab-buttons">
//             <TabButton
//               id={1}
//               handleClick={this.handleClick}
//               clickedButton={clickedButton}
//               text="Previous Events"
//             />
//             <TabButton
//               id={2}
//               handleClick={this.handleClick}
//               clickedButton={clickedButton}
//               text="Today Events"
//             />
//             <TabButton
//               id={3}
//               handleClick={this.handleClick}
//               clickedButton={clickedButton}
//               text="Future Events"
//             />
//           </div>

//           <div className="section-separator"></div>

//           <div className={tab === 1 ? "show-content" : "content"}>
//             {tab === 1 && <EventList route="previous" />}
//           </div>
//           <div className={tab === 2 ? "show-content" : "content"}>
//             {tab === 2 && <EventList route="today" />}
//           </div>
//           <div className={tab === 3 ? "show-content" : "content"}>
//             {tab === 3 && <EventList route="future" />}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default EventViewer;

import React, { Component } from "react";
import "../bootstrap/css/bootstrap.min.css";
import "../styles/event-viewer.css";
import "../styles/tabs.css";
import TabButton from "./TabButton";
import EventCard from "./EventCard";
import { EventList } from "../services/events";

class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        showTabs: true,
        tab: 2,
        clickedButton: 2,
      },
    };
  }

  handleClick = (buttonId) => {
    this.setState((prevState) => ({
      tabs: {
        ...prevState.tabs,
        tab: buttonId,
        clickedButton: buttonId,
      },
    }));
  };

  render() {
    const { showTabs, tab, clickedButton } = this.state.tabs;
    const { showFilteredEvents, filteredEvents } = this.props;

    return (
      <div
        className="d-flex align-items-center justify-content-center mt-3"
        style={{ marginLeft: "150px"}}
      >
        {showFilteredEvents && (
          <div className="col-8 event-viewer">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                eventID={event.id}
                eventTitle={event.title}
                eventOrganizer={event.organizer}
                eventExhibitor={event.exhibitors}
                eventLocation={event.location}
                eventDate={new Date(event.date + "T00:00:00")}
                eventStartTime={new Date(`2000-01-01 ${event.start_hour}`)}
                eventEndTime={new Date(`2000-01-01 ${event.end_hour}`)}
                eventSummary={event.description}
                eventCoverPath="/images/yachay.jpg"
              />
            ))}
          </div>
        )}

        {showTabs && !showFilteredEvents && (
          <div className="col-7 event-viewer">
            <div className="d-flex tab-buttons">
              <TabButton
                id={1}
                handleClick={this.handleClick}
                clickedButton={clickedButton}
                text="Eventos Previos"
              />
              <TabButton
                id={2}
                handleClick={this.handleClick}
                clickedButton={clickedButton}
                text="Eventos de hoy"
              />
              <TabButton
                id={3}
                handleClick={this.handleClick}
                clickedButton={clickedButton}
                text="Eventos Futuros"
              />
            </div>

            <div className="section-separator"></div>

            <div className={tab === 1 ? "show-content" : "content"}>
              {tab === 1 && <EventList route="previous" />}
            </div>
            <div className={tab === 2 ? "show-content" : "content"}>
              {tab === 2 && <EventList route="today" />}
            </div>
            <div className={tab === 3 ? "show-content" : "content"}>
              {tab === 3 && <EventList route="future" />}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EventViewer;
