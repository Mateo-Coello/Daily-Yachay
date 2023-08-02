import axios from "axios";

function getTokenFromCookie() {
  const tokenCookie = document.cookie.split("; ").find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}


class EventServices {
  static baseURL = 'http://localhost:4000'; 

  static getEventsByFilters = async (searchFilters) => {
    try {
      const { title, organizer, category, location, endDate, startDate } =
        searchFilters;

      const response = await axios.get(
        `http://127.0.0.1:4000/events/filters/ttl=${title}/org=${organizer}/cat=${category}/loc=${location}/startD=${startDate}/endD=${endDate}`
      );

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  
  static createEvent = async (postData) => {
    try {
      const token = getTokenFromCookie(); 
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const response = await axios.post(`${EventServices.baseURL}/events/create`, postData, { headers });
      console.log('Event created:', response.data.success);
    } catch (error) {
      throw new Error('Failed to create event. Please try again.'); 
    }
  };
}


export default EventServices;










