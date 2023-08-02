import axios from "axios";



class UserServices {
  static baseURL = 'http://localhost:4000'; 

  
  static  getUsersByEmail = async () => {
    try {
      const res = await axios.get("/users/email", { baseURL: UserServices.baseURL });
      return res.data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error.message);
      throw error;
    }
  }
}

export default UserServices;
