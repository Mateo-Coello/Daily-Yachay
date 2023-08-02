import React, { Component } from 'react';
import '../styles/event-card.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "./Comments.js";
import { Nav, NavItem, NavLink, TabContent, TabPane, Modal, Carousel, CarouselItem, CarouselControl, CarouselIndicators } from "reactstrap";
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
      eventcovers: null,
      isEventOpen: false,
      carouselImages: [], // Estado para almacenar las imágenes del carrusel
      activeIndex: 0, // Estado para controlar la imagen activa en el carrusel
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



  async componentDidMount() {
    try {
      const { eventID } = this.props;
      const carouselImages = await CoversServices.getCoversFromServer(eventID);
      console.log(carouselImages);
      this.setState({ carouselImages });
      
    } catch (error) {
      console.error('Error fetching covers from server:', error.message);
    }
  }

  renderCarouselImages = () => {
    const { carouselImages } = this.state;

    return carouselImages.map((image, index) => (
      <CarouselItem
        key={index}
        onExiting={() => this.setState({ animating: true })}
        onExited={() => this.setState({ animating: false })}
      >
        <img src={image} style={{ objectFit:"fill"}} alt={`Slide ${index + 1}`} className="carousel-image" />
      </CarouselItem>
    ));
  };



   render() {
    const { activeTab, isEventOpen, carouselImages, activeIndex, animating, register, reminder, registerButtonText
    } = this.state;

    const showCarousel = carouselImages.length > 0;

    
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

            <div style={{ width: "65%" , objectFit:"contain"}}>

              <div className="carousel-container" >
                {showCarousel ? (
                  <Carousel
                    activeIndex={activeIndex}
                    next={() => {
                      if (!animating) {
                        this.setState((prevState) => ({
                          activeIndex:
                            (prevState.activeIndex + 1) % carouselImages.length,
                        }));
                      }
                    }}
                    previous={() => {
                      if (!animating) {
                        this.setState((prevState) => ({
                          activeIndex:
                            (prevState.activeIndex -
                              1 +
                              carouselImages.length) %
                            carouselImages.length,
                        }));
                      }
                    }}
                  >
                    <CarouselIndicators
                      items={carouselImages}
                      activeIndex={activeIndex}
                      onClickHandler={() => {}}
                    />
                    {this.renderCarouselImages()}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={() => {}}
                    />
                    <CarouselControl
                      direction="next"
                      directionText="Next"
                      onClickHandler={() => {}}
                    />
                  </Carousel>
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/yachay.jpg`}
                    alt="Default Event Cover"
                    className="default-cover-image"
                  />
                )}
              </div>
              
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default EventCard;