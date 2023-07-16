import axios from "axios";

class EventServices {
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
      const response = await axios.post('http://127.0.0.1:4000/events/', postData);
      console.log('Event created:', response.data);
    } catch (error) {
      throw new Error('Failed to create event. Please try again.'); // Throw custom error message
    }
  };
}

export default EventServices;
