import React, { Component } from "react";
import "../styles/search-bar.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends Component {
  render() {
    const { searchFilters, handleFilterValue, handleSearchByFilters } =
      this.props;

    return (
      <Form>
        <FormGroup style={{ display: "flex", justifyContent: "center" }}>
          <Label className="visually-hidden" for="search">
            Buscar
          </Label>
          <Input
            type="text"
            id="search"
            value={searchFilters.title}
            onChange={(e) => handleFilterValue("title", e.target.value)}
            placeholder="Buscar"
          />
          <Button
            // type="submit"
            onClick={() => handleSearchByFilters(searchFilters)}
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </FormGroup>

        <FormGroup className="input-field">
          <Label for="event-organizer">Organizador:</Label>
          <Input
            type="text"
            id="event-organizer"
            name="organizer"
            value={searchFilters.organizer}
            onChange={(e) => handleFilterValue("organizer", e.target.value)}
            placeholder=""
          />
        </FormGroup>

        <FormGroup className="input-field">
          <Label for="eventCategory">Categoría:</Label>
          <Input
            id="eventCategory"
            name="category"
            type="select"
            value={searchFilters.category}
            onChange={(e) => handleFilterValue("category", e.target.value)}
          >
            <option value="">Choose a category</option>
            <option value="Congreso">Congreso</option>
            <option value="Feria">Feria</option>
            <option value="Taller">Taller</option>
            <option value="Reunion Club">Reunion Club</option>
          </Input>
        </FormGroup>

        <FormGroup className="input-field">
          <Label for="event-organizer">Lugar:</Label>
          <Input
            type="text"
            id="event-location"
            name="location"
            value={searchFilters.location}
            onChange={(e) => handleFilterValue("location", e.target.value)}
            placeholder=""
          />
        </FormGroup>

        <FormGroup className="input-field">
          <Label>Rango:</Label>
          <div className="input-date-range">
            <Input
              type="date"
              id="event-start-date"
              value={searchFilters.startDate}
              onChange={(e) => handleFilterValue("startDate", e.target.value)}
              style={{ width: "48%" }}
              className="no-icon"
            />
            <Input
              type="date"
              id="event-end-date"
              value={searchFilters.endDate}
              onChange={(e) => handleFilterValue("endDate", e.target.value)}
              style={{ width: "48%" }}
              className="no-icon"
            />
          </div>
        </FormGroup>
      </Form>
    );
  }
}

export default SearchBar;
