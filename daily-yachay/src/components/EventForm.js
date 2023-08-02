import React, { Component } from 'react';
import '../styles/event-card.css';
import EventServices from "../services/events.services";
import UserServices from '../services/users.services';
import CoversServices from '../services/covers.services'; 

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormText,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        id: "",
        u_id: "",
        title: "",
        organizer: "",
        exhibitors: "",
        date: "",
        start_hour: "",
        end_hour: "",
        location: "",
        category: "",
        description: "",
        open_event: true,
        avail_places: null,
        recur_event: false,
      },
      coverImgFiles: [], // Estado para almacenar las imágenes seleccionadas
      uploadedUrls: [], // Estado para almacenar las URLs de las imágenes subidas
    };
  }

  static generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
    const randomString = Math.random().toString(36).substring(2, 12); // Generate random string
    const uniqueId = timestamp + randomString; // Concatenate timestamp and random string
    return uniqueId.substring(0, 30); // Trim the ID to be 30 characters long
  }

  handleChange = (e) => {
    const { id, name, value } = e.target;
    let updatedValue = value;

    if (id === "event-open-option" || id === "event-closed-option") {
      updatedValue = id === "event-open-option";
    }

    this.setState((prevState) => ({
      postData: {
        ...prevState.postData,
        [name]: updatedValue,
      },
    }));
  };
  
  



  handleCoverImgChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files); // Agregar esta línea para verificar los archivos seleccionados
    this.setState({ coverImgFiles: files });
  };
  



   // Manejador para subir las imágenes a S3
   handleUploadImages = async () => {
    console.log(this.state.coverImgFiles); // Agregar esta línea para verificar los archivos antes de cargarlos
    const uploadPromises = this.state.coverImgFiles.map((file) => CoversServices.uploadFileToS3(file));
    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      this.setState({ uploadedUrls });
    } catch (error) {
      console.error('Error uploading images:', error.message);
    }
  };



  handleCreateEvent = async () => {
    const event_id =  EventForm.generateUniqueId();
    const userResponse = await UserServices.getUsersByEmail();   
    console.log(userResponse.id);
    this.setState(
      (prevState) => ({
        postData: {
          ...prevState.postData,
          id: event_id,
          u_id: userResponse.id,

        },
      }),
      async () => {
        console.log(this.state.postData);
        try {
          await EventServices.createEvent(this.state.postData);
          // Additional logic or state updates upon successful event creation
        } catch (error) {
          console.error("Error creating event:", error.message);
          // Additional error handling or state updates for error scenario
        }
      }
    );
  };



  render() {
    const { isOpen, toggle } = this.props;
    const { postData, coverImgFiles, uploadedUrls } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg" scrollable centered>
        <ModalHeader toggle={toggle}>Crear Evento</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="event-title">Título:</Label>
              <Input
                type="text"
                id="event-title"
                name="title"
                value={postData.title}
                onChange={this.handleChange}
                placeholder="Introduzca el título del evento"
              />
            </FormGroup>

            <FormGroup>
              <Label for="event-organizer">Organizador:</Label>
              <Input
                type="text"
                id="event-organizer"
                name="organizer"
                value={postData.organizer}
                onChange={this.handleChange}
                placeholder="Introduzca el organizador del evento"
              />
            </FormGroup>

            <FormGroup>
              <Label for="event-organizer">Expositores:</Label>
              <Input
                type="text"
                id="event-exhibitors"
                name="exhibitors"
                value={postData.exhibitors}
                onChange={this.handleChange}
                placeholder="Introduzca los expositores del evento"
              />
            </FormGroup>

            <FormGroup className="input-field">
              <Label for="eventCategory">Categoría:</Label>
              <Input
                id="eventCategory"
                name="category"
                type="select"
                value={postData.category}
                onChange={this.handleChange}
              >
                <option value="">Seleccione una categoría:</option>
                <option value="Congreso">Congreso</option>
                <option value="Feria">Feria</option>
                <option value="Taller">Taller</option>
                <option value="Reunion Club">Reunion Club</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="event-organizer">Lugar:</Label>
              <Input
                type="text"
                id="event-location"
                name="location"
                value={postData.location}
                onChange={this.handleChange}
                placeholder="Introduzca el lugar del evento"
              />
            </FormGroup>

            <FormGroup tag="fieldset">
              <Row>
                <Label>Tipo de evento:</Label>
                <Col>
                  <FormGroup check>
                    <Input
                      type="radio"
                      id="event-open-option"
                      name="open_event"
                      value={postData.open_event}
                      onChange={this.handleChange}
                    />{" "}
                    <Label check>Abierto</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      type="radio"
                      id="event-closed-option"
                      name="open_event"
                      value={postData.open_event}
                      onChange={this.handleChange}
                    />{" "}
                    <Label check>Requiere Inscripción</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      id="event-recur-event"
                      name="recur_event"
                      value={postData.recur_event}
                      onChange={this.handleChange}
                    />{" "}
                    <Label check>Evento Recurrente</Label>
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>

            {!postData.open_event && (
              <FormGroup
                className="d-flex align-items-center"
                style={{ width: "15%" }}
              >
                <Label style={{ marginRight: "10px" }}>Cupos: </Label>
                <Input
                  type="text"
                  id="event-avail-places"
                  name="avail_places"
                  value={postData.avail_places}
                  onChange={this.handleChange}
                  style={{ padding: "5px", textAlign: "right" }}
                />
              </FormGroup>
            )}

            <Row>
              <Col>
                <FormGroup className="d-flex align-items-center">
                  <Label for="event-date" style={{ marginRight: "10px" }}>
                    Fecha:
                  </Label>
                  <Input
                    type="date"
                    id="event-date"
                    name="date"
                    placeholder="Seleccione la fecha del evento"
                    value={postData.date}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup className="d-flex align-items-center">
                  <Label style={{ marginRight: "10px" }}>Hora:</Label>
                  <Row>
                    <Col>
                      <Input
                        type="time"
                        id="event-start_hour"
                        name="start_hour"
                        value={postData.start_hour}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col>
                      <Input
                        type="time"
                        id="event-end_hour"
                        name="end_hour"
                        value={postData.end_hour}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="event-description">Descripción:</Label>
              <Input
                type="textarea"
                id="event-description"
                name="description"
                value={postData.description}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="event-coverImg">Portada</Label>
              <Input
                type="file"
                id="event-coverImg"
                name="coverImg"
                multiple onChange={this.handleCoverImgChange}
              />
              {/* <FormText>
                Asegúrate que las imágenes tengan una resolución de al menos 400x500 pixeles.
              </FormText> */}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleUploadImages}>
            Subir Imágenes
          </Button>
          <Button
            color="success"
            onClick={this.handleCreateEvent}
            disabled={uploadedUrls.length === 0}
          >
            Agregar Evento
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EventForm;
