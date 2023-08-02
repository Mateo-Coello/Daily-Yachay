import React, { Component } from 'react';
import '../styles/comments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CommentServices from '../services/comments.services';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';



class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.eventID,
      inputValue: '',
      comments: [],
      newComment: '',
      user: this.props.user,
      childrenComments: [],
      parentId: null,
      response_user: '',
      showOptionsForComment: '',
    };
    this.textareaRef = React.createRef();

 }


  async componentDidMount() {
    try {
      // Obtener comentarios principales
      const response = await CommentServices.getComments(this.state.eventId);
      response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({ comments: response.data });

      const response2 = await CommentServices.getChildrenComments(this.state.eventId);
      response2.data.sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt));
      this.setState({ childrenComments : response2.data });

    } catch (error) {
      console.error("Error al obtener los comentarios:", error.message);
    }

  }

  
    
  handleReplyClick = (commentId, response_user) => {
    // Establecer el ID del comentario al que se está respondiendo como parentId
    this.setState({ parentId: commentId });
    this.setState({ response_user: response_user });
  };

  handleCommentSubmit = async (event) => {
    event.preventDefault();
    const { newComment, parentId } = this.state;

    if (newComment.trim() !== '') {
      try {
        const newCommentId = uuidv4();

        // Enviar el nuevo comentario (o respuesta) al servidor
        const response = await CommentServices.createComment({
          id: newCommentId,
          e_id: this.state.eventId,
          u_id: this.state.user.id,
          p_id: parentId, 
          content: newComment,
        });
        // console.log(response);
        

        this.setState((prevState) => {
          if (response.data.data.p_id) {
            // Si tiene parentId, agregarlo al array childrenComments
            return {
              childrenComments: [...prevState.childrenComments, response.data.data],
              newComment: '',
              parentId: null, // Reiniciar parentId después de enviar el comentario (o respuesta)
            };
          } else {
            // Si no tiene parentId, agregarlo al array comments
            return {
              comments: [...prevState.comments, response.data.data],
              newComment: '',
              parentId: null, // Reiniciar parentId después de enviar el comentario (o respuesta)
            };
          }
        });

      } catch (error) {
        console.error("Error al crear el comentario:", error.message);
      }
    }
  };

  handleInputChange = (event) => {
    this.adjustTextareaHeight();
    this.setState({ newComment: event.target.value });
  };

  adjustTextareaHeight = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = 'auto';
      this.textareaRef.current.style.height = `${this.textareaRef.current.scrollHeight}px`;

      // Limit the textarea height
      const maxTextareaHeight = 100;
      if (this.textareaRef.current.scrollHeight > maxTextareaHeight) {
        this.textareaRef.current.style.height = `${maxTextareaHeight}px`;
      }
    }
  };



  handleEditClick = (commentId) => {
    // Lógica para editar el comentario
    console.log("Editar comentario:", commentId);
  };


  
  handleDeleteClick = async (commentId) => {
    try {
      const response = await CommentServices.deleteComment(commentId);
      
      this.setState((prevState) => ({
        comments: prevState.comments.filter((comment)=> comment.id !== commentId), 
      }));

      this.setState((prevState) => ({
        childrenComments: prevState.childrenComments.filter((comment)=> comment.id !== commentId), 
      }));

    } catch (error) {
      console.error("Error al borrar el comentario:", error.message);
    }
  };
  


  render() {
    const { inputValue, comments, newComment, user, childrenComments,parentId,response_user } = this.state;
    const userEmail = user ? user.email : null;
    const userPicture = user ? user.user_profile_pic : "../images/default-profile-pic.jpg";
  

    return (
      <div className="comment-section">
        {comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <img
                  className="user-profile-picture"
                  src={comment.user.user_profile_pic}
                  alt="User Profile"
                />
                <div className="comment-content">
                  <p className="comment-text">
                    <b>
                      {comment.user.name} {comment.user.lname}
                    </b>
                  </p>
                  <p className="comment-text">{comment.content}</p>
                  <div className="comment-footer">
                    <p className="comment-date">
                      {CommentServices.formatDateTime(comment.createdAt)}
                    </p>
                    <button
                      className="reply-button"
                      onClick={() =>
                        this.handleReplyClick(comment.id, comment.user.name)
                      }
                    >
                      Responder
                    </button>
                  </div>

                  {/* CHILD COMMENTS */}
                  {childrenComments
                    .filter(
                      (child_comment) => child_comment.p_id === comment.id
                    )
                    .map((child_comment) => (
                      <div className="comment" key={child_comment.id}>
                        <img
                          className="user-profile-picture"
                          src={child_comment.user.user_profile_pic}
                          alt="User Profile"
                        />
                        <div className="comment-content">
                          <p className="comment-text">
                            <b>
                              {child_comment.user.name}{" "}
                              {child_comment.user.lname}
                            </b>
                          </p>
                          <p className="comment-text">
                            {child_comment.content}
                          </p>
                          <div className="comment-footer">
                            <p className="comment-date">
                              {CommentServices.formatDateTime(
                                child_comment.createdAt
                              )}
                            </p>
                            <button
                              className="reply-button"
                              onClick={() =>
                                this.handleReplyClick(
                                  comment.id,
                                  child_comment.user.name
                                )
                              }
                            >
                              Responder
                            </button>
                          </div>
                        </div>

                        {child_comment.user.email === userEmail && (
                          <Dropdown
                            direction="down"
                            isOpen={
                              this.state.showOptionsForComment ===
                              child_comment.id
                            }
                            toggle={() =>
                              this.setState((prevState) => ({
                                showOptionsForComment:
                                  prevState.showOptionsForComment ===
                                  child_comment.id
                                    ? null
                                    : child_comment.id,
                              }))
                            }
                          >
                            <DropdownToggle tag="span">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem
                                onClick={() =>
                                  this.handleEditClick(child_comment.id)
                                }
                              >
                                <FontAwesomeIcon icon={faEdit} /> Editar
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  this.handleDeleteClick(child_comment.id)
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} /> Eliminar
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        )}
                      </div>
                    ))}
                  {/* END CHILD COMMENTS */}
                </div>

                {comment.user.email === userEmail && (
                  <Dropdown
                    direction="down"
                    isOpen={this.state.showOptionsForComment === comment.id}
                    toggle={() =>
                      this.setState((prevState) => ({
                        showOptionsForComment:
                          prevState.showOptionsForComment === comment.id
                            ? null
                            : comment.id,
                      }))
                    }
                  >
                    <DropdownToggle tag="span">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        onClick={() => this.handleEditClick(comment.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => this.handleDeleteClick(comment.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}

        <div className="add-comment-section">
          <img
            className="user-profile-picture"
            src={userPicture}
            alt="User Profile"
          />

          <form onSubmit={this.handleCommentSubmit}>
            <textarea
              className="dynamic-textarea"
              style={{ height: this.state.textareaHeight }}
              value={newComment}
              ref={this.textareaRef}
              onChange={this.handleInputChange}
              placeholder={parentId ? `@${response_user} ` : "Add a comment"}
            />

            <button className="comment-submit-button" type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CommentsSection;