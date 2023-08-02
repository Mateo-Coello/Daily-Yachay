import axios from 'axios';


class CommentServices {
    static baseURL = 'http://localhost:4000';



    static createComment = async (comment)  => {
        try {
            const response = await axios.post(`${CommentServices.baseURL}/comments/`, comment);
            return(response);
        } catch (error) {
            console.error("Error al crear el comentario:", error.message);
            throw error;
        }
    }


    static getComments = async (event_id) => {
        try {
            const response = await axios.get(`${CommentServices.baseURL}/comments/${event_id}`);
            return response;
        } catch (error) {
          throw new Error("Error al obtener los comentarios hijos:" + error.message);

        }
    }

    static getChildrenComments = async (event_id) => {
        try {
            const response = await axios.get(`${CommentServices.baseURL}/comments/childs/${event_id}`);
            return response;
        } catch (error) {
            console.error("Error al obtener los comentarios hijos:", error.message);
            throw error;
        }
    }

    static updateComment = (comment_id) => {
        try {
            const response = axios.put(`${CommentServices.baseURL}/comments/${comment_id}`)
            console.log(response);
        } catch (error) {
            console.error("Error al actualizar el comentario:", error.message);
            throw error;
        }
    }
    static deleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`${CommentServices.baseURL}/comments/delete`,{
                data: {commentId:commentId}
            });
            console.log(response);

        } catch (error) {
            console.error("Error al eliminar el comentario:", error.message);
            throw error;
        }
    };


    static formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const now = new Date();
        const diffInMilliseconds = now - date;
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        
        if (diffInDays <= 7) {
          if (diffInDays === 0) {
            const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            if (diffInMinutes < 1) {
              return `Hace unos segundos`;
            } else if (diffInMinutes < 60) {
              return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
            } else {
              return `Hace ${Math.floor(diffInMinutes / 60)} hora${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''}`;
            }
          } else if (diffInDays === 1) {
            return `Hace 1 día`;
          } else {
            return `Hace ${diffInDays} días`;
          }
        } else {
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
          return date.toLocaleDateString('es-ES', options);
        }
      }
}

export default CommentServices;