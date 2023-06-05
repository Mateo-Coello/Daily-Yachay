import React, { useState } from 'react';
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
} from "reactstrap";

const EventForm = ({ isOpen, toggle }) => {

  const [activeItem, setActiveItem] = useState({
    title: '',
    organizer: '',
    exhibitors: '',
    location: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const onSave = (item) => {
    console.log(item);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} xl scrollable centered>
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
              onChange={handleChange}
              placeholder="Introduzca el titulo del evento"
            />
          </FormGroup>
          <FormGroup>
            <Label for="event-organizer">Organizador:</Label>
            <Input
              type="text"
              id="event-organizer"
              name="organizer"
              value={activeItem.organizer}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder="Introduzca el lugar del evento"
            />
          </FormGroup>
          <FormGroup>
            <Label for="event-date">Fecha:</Label>
            <Input
              type="date"
              id="event-date"
              name="date"
              placeholder="Seleccione la fecha del evento"
              value={activeItem.date}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Hora:</Label>
            <Input
              type="time"
              id="event-time"
              name="time"
              value={activeItem.time}
              onChange={handleChange}
              placeholder="Seleccione la hora del evento"
            />
          </FormGroup>

          <FormGroup>
            <Label for="todo-description">Descripción:</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              value={activeItem.time}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">Portada</Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
            />
            <FormText>
              Asegurate que la imagen tenga una resolucion de al menos 400x500 pixeles. 
            </FormText>
          </FormGroup>

        </Form>
      </ModalBody>

      <ModalFooter>
        <Button
          color="success"
          onClick={() => onSave(activeItem)}
        >
          Agregar Evento
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EventForm;