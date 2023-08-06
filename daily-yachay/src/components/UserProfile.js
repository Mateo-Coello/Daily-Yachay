import React, { Component } from "react";
import "../bootstrap/css/bootstrap.min.css";
import "../styles/user-profile.css";
import "../styles/event-viewer.css";
import "../styles/tabs.css";
import TabButton from "./TabButton";
import EventCard from "./EventCard";
import UserServices from '../services/users.services';
import EventServices from "../services/events.services";
import { Row } from "reactstrap";


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        Id: 0,
        name: "",
        lname: "",
        user_profile_pic: "",
        numberCreatedEvents: 0,
        createdEvents: null,
        numberEnrolledEvents: 0,
        enrolledEvents: [],
        showCreatedEvents: true,
      },
      dataLoaded: false,
      tabs: {
        tab: 1,
        clickedButton: 1,
      },
    };
  }

  // Solicitud al backend para obtener datos del usario


  async componentDidMount() {
    
      // Realizar una solicitud para obtener los datos del usuario
      const userResponse = await UserServices.getUsersByEmail();
      // console.log(userResponse);
      const userEvents = await EventServices.getUserEvents(userResponse.id);
      console.log(userEvents);
      // console.log(userEvents.data);
      // Actualizar el estado con los datos del usuario obtenidos
      this.setState({
        userInfo: {
          id: userResponse.id,
          name: userResponse.name,
          lname: userResponse.lname,
          createdEvents: userEvents,
          user_profile_pic: userResponse.user_profile_pic,
          numberCreatedEvents: userResponse.numberCreatedEvents,
          createdEvents: userResponse.createdEvents,
          numberEnrolledEvents: userResponse.numberEnrolledEvents,
          enrolledEvents: userResponse.enrolledEvents,
        },
        dataLoaded: true,
      });
   
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
      userEvents,
    } = this.state.userInfo;

    const { userInfo } = this.state;
    const { Id, name, lname, user_profile_pic } = userInfo;
    const { dataLoaded } = this.state;
  
    return (
      <div>
        {dataLoaded ? (
          <div
            className="d-flex flex-column justify-contents-center align-items-center mt-3"
            style={{ marginLeft: "150px" }}
          >
            <div className="col-4 user-info-container">
              <div className="user-pic">
                <img
                  src={user_profile_pic}
                  alt="/images/default-profile-pic.jpg"
                />
              </div>
              <div className="user-info-content p-3">
                <div className="d-flex justify-content-start w-100">
                  <h1>
                    {name ? name+"\n" : "Name\t"}
                    {lname ? lname : "LName"} 
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
        ) : (
          // Si dataLoaded es false, mostrar un mensaje de carga o lo que desees
          <div
          className="d-flex flex-column justify-contents-center align-items-center mt-3"
          style={{ marginLeft: "150px" }}
          >Cargando...</div>
        )}
      </div>
    );
  }
}

export default UserProfile;
