import React, { Component } from 'react';
import '../styles/event-card.css';
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
      activeItem: {
        title: '',
        organizer: '',
        exhibitors: '',
        location: '',
        openEvent: true,
        availPlaces: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
      },
    };
  }

  handleChange = (e) => {
    const { id, name, value} = e.target;
    let {activeItem} = this.state;
    let updatedValue = value;
  
    if (id === 'event-open-option' || id === 'event-closed-option') {
      updatedValue = id === 'event-open-option';
    }

    if (activeItem.openEvent) {
      activeItem.availPlaces = '';
    }
  
    this.setState((prevState) => ({
      activeItem: {
        ...prevState.activeItem,
        [name]: updatedValue,
      },
    }));
  };  

  onSave = (item) => {
    console.log(item);
  };

  render() {
    const { isOpen, toggle } = this.props;
    const { activeItem } = this.state;

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
                value={activeItem.title}
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
                value={activeItem.organizer}
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
                value={activeItem.exhibitors}
                onChange={this.handleChange}
                placeholder="Introduzca los expositores del evento"
              />
            </FormGroup>

            <FormGroup>
              <Label for="event-organizer">Lugar:</Label>
              <Input
                type="text"
                id="event-location"
                name="location"
                value={activeItem.location}
                onChange={this.handleChange}
                placeholder="Introduzca el lugar del evento"
              />
            </FormGroup>

            <FormGroup tag="fieldset">
              <Label>
                Tipo de evento:
              </Label>
              <FormGroup check>
                <Input
                  type="radio"
                  id="event-open-option"
                  name="openEvent"
                  value={activeItem.openEvent}
                  onChange={this.handleChange}
                />
                {' '}
                <Label check>
                  Abierto
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="radio"
                  id="event-closed-option"
                  name="openEvent"
                  value={activeItem.openEvent}
                  onChange={this.handleChange}
                />
                {' '}
                <Label check>
                 Requiere Inscripción
                </Label>
              </FormGroup>
            </FormGroup>

            {!activeItem.openEvent && (
              <FormGroup className='d-flex align-items-center' style={{ width: '15%' }}>
                <Label style={{ marginRight: '10px' }}>Cupos: </Label>
                <Input
                  type="text"
                  id="event-avail-places"
                  name="availPlaces"
                  value={activeItem.availPlaces}
                  onChange={this.handleChange}
                  style={{ padding: '5px', textAlign: 'right'}}
                />
              </FormGroup>
            )}

            <Row>
              <Col>
                <FormGroup className='d-flex align-items-center'>
                  <Label for="event-date" style={{ marginRight: '10px' }}>Fecha:</Label>
                  <Input
                    type="date"
                    id="event-date"
                    name="date"
                    placeholder="Seleccione la fecha del evento"
                    value={activeItem.date}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup className='d-flex align-items-center'>
                    <Label style={{ marginRight: '10px' }}>Hora:</Label>
                    <Row>
                      <Col>
                        <Input
                          type="time"
                          id="event-startTime"
                          name="startTime"
                          value={activeItem.startTime}
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col>
                        <Input
                          type="time"
                          id="event-endTime"
                          name="endTime"
                          value={activeItem.endTime}
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
                value={activeItem.description}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="event-coverImg">Portada</Label>
              <Input
                type="file"
                id="event-coverImg"
                name="coverImg"
              />
              <FormText>
                Asegúrate que la imagen tenga una resolución de al menos 400x500 pixeles.
              </FormText>
            </FormGroup>

          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            color="success"
            onClick={() => this.onSave(activeItem)}
          >
            Agregar Evento
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EventForm;
