import React, { useState } from 'react';
import '../styles/comments.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import DynamicTextarea from './dynamic-text-area';

// const FetchPreviousComments = (eventID) => {
//     ;
// }

const CommentsSection = () => {
    const [inputValue, setInputValue] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    // const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    // const handleToggleComments = () => {
    //     setShowComments(true)
    // };

    return (
        <div className='comment-section'>

            {/* <button
                onClick={handleToggleComments}
                className={showComments ? 'comments-button active' : 'comments-button'}>
                <FontAwesomeIcon icon={faMessage} />
            </button> */}

            {comments.length > 0 && (
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {comments.map((commentContent, commentID) => (
                        <div className='comment'>
                            <p key={commentID}>{commentContent}</p>
                        </div>
                    ))}
                </div>
            )}
            {comments.length === 0 && <p>No comments yet.</p>}

            <div className='add-comment-section'>

                <div style={{ width: '35px' }}>
                    <img className="profile-picture" src="/images/default-profile-pic.jpg" alt="/images/default-profile-pic.jpg" />
                </div>

                <form onSubmit={handleCommentSubmit}>

                    <DynamicTextarea inputValue={inputValue} setInputValue={setInputValue}/>
                    
                    <button
                        class="comment-submit-button"
                        type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            </div>

        </div>
    );
}

export default CommentsSection;
