import React, { Component } from "react";
import "../bootstrap/css/bootstrap.min.css";
import "../styles/user-profile.css";
import "../styles/event-viewer.css";
import "../styles/tabs.css";
import TabButton from "./TabButton";
import EventCard from "./EventCard";
import { Row } from "reactstrap";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        numberCreatedEvents: 0,
        createdEvents: 0,
        numberEnrolledEvents: 0,
        enrolledEvents: 0,
      },
      tabs: {
        tab: 1,
        clickedButton: 1,
      },
    };
  }

  handleTab = (buttonId) => {
    this.setState((prevState) => ({
      tabs: {
        ...prevState.tabs,
        tab: buttonId,
        clickedButton: buttonId,
      },
    }));
  };

  render() {
    const { tab, clickedButton } = this.state.tabs;
    const {
      showCreatedEvents,
      createdEvents,
      showEnrolledEvents,
      enrolledEvents,
    } = this.state.userInfo;
    const { userId, userName, userLastName, profilePicPath } = this.props;

    return (
      <div
        className="d-flex flex-column justify-contents-center align-items-center mt-3"
        style={{ marginLeft: "150px" }}
      >
        <div className="col-5 user-info-container">
          <div className="user-pic">
            <img
              src="/images/default-profile-pic.jpg"
              alt="/images/default-profile-pic.jpg"
            />
          </div>
          <div className="user-info-content p-3">
            <div className="d-flex justify-content-start w-100">
              <h1>
                {userName ? userName : "Name"}{" "}
                {userLastName ? userLastName : "LName"}
              </h1>
            </div>
            <div className="d-flex w-100">
              <div className="d-flex w-50">
                <h1>{0} Eventos creados</h1>
              </div>
              <div className="d-flex w-50">
                <h1>{0} Eventos inscritos</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="content-separator"></div>

        <div className="col-7 event-viewer pt-0">
          <div className="d-flex tab-buttons">
            <TabButton
              id={1}
              handleClick={this.handleTab}
              clickedButton={clickedButton}
              text="Eventos Creados"
            />
            <TabButton
              id={2}
              handleClick={this.handleTab}
              clickedButton={clickedButton}
              text="Eventos Inscritos"
            />
            {/* <TabButton
                id={3}
                handleClick={this.handleTab}
                clickedButton={clickedButton}
                text="Future Events"
              /> */}
          </div>

          <div className="section-separator"></div>

          <div className={tab === 1 ? "show-content" : "content"}>
            {tab === 1 && showCreatedEvents && (
              <div className="col-8 event-viewer">
                {createdEvents.map((event) => (
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
          </div>
          <div className={tab === 1 ? "show-content" : "content"}>
            {tab === 1 && showEnrolledEvents && (
              <div className="col-8 event-viewer">
                {enrolledEvents.map((event) => (
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
          </div>

          {/* <div className={tab === 3 ? "show-content" : "content"}>
              {tab === 3 && <EventList route="future" />}
            </div> */}
        </div>
      </div>
    );
  }
}

export default UserProfile;
