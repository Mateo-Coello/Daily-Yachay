// import React, { useState } from "react";
// import "../styles/search-bar.css";
// import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// const SearchBar = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCriteria, setSelectedCriteria] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCriteriaChange = (e) => {
//     const { value, checked } = e.target;
//     setSelectedCriteria((prevSelected) => {
//       if (checked) {
//         return [...prevSelected, value];
//       } else {
//         return prevSelected.filter((criteria) => criteria !== value);
//       }
//     });
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     // Llamar a la función onSearch con los criterios seleccionados, la consulta de búsqueda y el rango de fechas
//     onSearch(selectedCriteria, searchQuery, startDate, endDate);
//   };

//   return (
//     // const { organizer, category, location, dateRange } = this.props;

//     <Form onSubmit={handleSearchSubmit}>
//       <FormGroup style={{ display: "flex", justifyContent: "center" }}>
//         <Label className="visually-hidden" for="search">
//           Buscar
//         </Label>
//         <Input
//           type="text"
//           id="search"
//           onChange={handleSearchChange}
//           placeholder="Buscar"
//         />
//         <Button
//           type="submit"
//           onClick={handleSearchSubmit}
//           style={{ marginLeft: "10px" }}
//         >
//           <FontAwesomeIcon icon={faMagnifyingGlass} />
//         </Button>
//       </FormGroup>

//       <FormGroup className="input-field">
//         <Label for="event-organizer">Organizador:</Label>
//         <Input
//           type="text"
//           id="event-organizer"
//           name="organizer"
//           placeholder=""
//         />
//       </FormGroup>

//       <FormGroup className="input-field">
//         <Label for="exampleSelect">Categoría:</Label>
//         <Input id="exampleSelect" name="select" type="select">
//           <option>Congreso</option>
//           <option>Feria</option>
//           <option>Taller</option>
//           <option>Reunion de Club</option>
//         </Input>
//       </FormGroup>

//       <FormGroup className="input-field">
//         <Label for="event-organizer">Lugar:</Label>
//         <Input type="text" id="event-location" name="location" placeholder="" />
//       </FormGroup>

//       <FormGroup className="input-field">
//         <Label>Rango:</Label>
//         <div className="input-date-range">
//           <Input
//             type="date"
//             id="event-start-date"
//             value={startDate}
//             onChange={handleStartDateChange}
//             style={{ width: "48%" }}
//             className="no-icon"
//           />
//           <Input
//             type="date"
//             id="event-end-date"
//             value={endDate}
//             onChange={handleEndDateChange}
//             style={{ width: "48%" }}
//             className="no-icon"
//           />
//         </div>
//       </FormGroup>

//       <FormGroup>
//         <Label check>
//           <Input
//             type="checkbox"
//             value="organizador"
//             checked={selectedCriteria.includes("organizador")}
//             onChange={handleCriteriaChange}
//           />
//           Organizador
//         </Label>

//         <Label check>
//           <Input
//             type="checkbox"
//             value="ubicacion"
//             checked={selectedCriteria.includes("ubicacion")}
//             onChange={handleCriteriaChange}
//           />
//           Ubicación
//         </Label>

//         <Label check>
//           <Input
//             type="checkbox"
//             value="categoria"
//             checked={selectedCriteria.includes("categoria")}
//             onChange={handleCriteriaChange}
//           />
//           Categoría
//         </Label>

//         <Label check>
//           <Input
//             type="checkbox"
//             value="rangoFecha"
//             checked={selectedCriteria.includes("rangoFecha")}
//             onChange={(e) => {
//               handleCriteriaChange(e);
//               toggleDatePicker();
//             }}
//           />
//           Rango de Fecha
//         </Label>
//       </FormGroup>

//       {showDatePicker && (
//         <FormGroup>
//           <Label>
//             Fecha de inicio:
//             <Input
//               type="date"
//               id="event-start-date"
//               value={startDate}
//               onChange={handleStartDateChange}
//               placeholder="Desde"
//             />
//           </Label>
//           <Label>
//             Fecha de fin:
//             <Input
//               type="date"
//               id="event-end-date"
//               value={endDate}
//               onChange={handleEndDateChange}
//               placeholder="Hasta"
//             />
//           </Label>
//         </FormGroup>
//       )}
//     </Form>
//   );
// };

// export default SearchBar;

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
