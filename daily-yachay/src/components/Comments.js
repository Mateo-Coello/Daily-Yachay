import React, { Component } from 'react';
import '../styles/comments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DynamicTextarea from './DynamicTextArea';

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.eventID,
      inputValue: '',
      comments: [],
      newComment: '',
    };
  }

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { newComment, comments } = this.state;
    if (newComment.trim() !== '') {
      this.setState({
        comments: [...comments, newComment],
        newComment: '',
      });
    }
  };

  render() {
    const { inputValue, comments, newComment } = this.state;

    return (
      <div className="comment-section">
        {comments.length > 0 && (
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {comments.map((commentContent, commentID) => (
              <div className="comment<h2>Fecha: </h2>">
                <p key={commentID}>{commentContent}</p>
              </div>
            ))}
          </div>
        )}
        {comments.length === 0 && <p>No comments yet.</p>}

        <div className="add-comment-section">
          <img
            src="/images/default-profile-pic.jpg"
            alt="/images/default-profile-pic.jpg"
          />

          <form onSubmit={this.handleCommentSubmit}>
            <DynamicTextarea
              inputValue={inputValue}
              setInputValue={(value) => this.setState({ newComment: value })}
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
