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


  // GOOGLE OAUTH

  static getGoogleUrl = (from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  
    const options = {
      redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT,
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: from,
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootUrl}?${qs.toString()}`; 
  };

}


export default EventServices;










