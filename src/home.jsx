import useFetch from "./use_fetch";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "./modal";
import ShowReply from "./reply";
import image from "../public/images/avatars/image-juliusomo.png";
import reply_img from "../public/images/icon-reply.svg";
import delete_icon from "../public/images/icon-delete.svg";
import edit_icon from "../public/images/icon-edit.svg";

const Home = () => {
  const { data: comments } = useFetch("http://localhost:3000/comments");

  const [votes, setVotes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);
  const [activeReply, setActiveReply] = useState(null);

  const handleReplyClick = (id) => {
    setActiveReply((prevActiveReply) => (prevActiveReply === id ? null : id)); // Toggle reply input visibility
    console.log('handle reply is working');
  };

  useEffect(() => {
    if (comments && Array.isArray(comments)) {
      const initialVotes = {};
      comments.forEach((comment) => {
        // Initialize votes for the comment
        initialVotes[comment.id] = 12; // Assuming each comment starts with 12 votes

        // Check if the comment has replies and initialize their votes as well
        if (comment.replies && Array.isArray(comment.replies)) {
          comment.replies.forEach((reply) => {
            initialVotes[reply.id] = 12; // Assuming each reply also starts with 12 votes
          });
        }
      });
      setVotes(initialVotes);
    }
  }, [comments]);

  const incrementValue = (commentId) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: prevVotes[commentId] + 1,
    }));
  };

  const decrementValue = (commentId) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [commentId]: prevVotes[commentId] > 0 ? prevVotes[commentId] - 1 : 0,
    }));
  };

  const handleDeleteClick = (replyId) => {
    setShowModal(true);
    setReplyToDelete(replyId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    // Implement your deletion logic here
    // For example, deleting the reply from your state or making an API call to delete the reply
    console.log("Deleting reply with ID:", replyToDelete);
    // Close the modal after deletion
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="comments_container">
        {/* {isLoading && <p className="loading_text">Loading...</p>} */}
        {comments &&
          comments.map((comment) => (
            <div className="comment_container box" key={comment.id}>
              <div className="boxes">
                <div className="absolute_container">
                  <div className="profile">
                    <img src={comment.user.image.png} alt="" />
                    <span className="user_name">{comment.user.username}</span>
                    <span className="date_comment">{comment.createdAt}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
                <div className="vote_container">
                  <div className="votes">
                    <button
                      className="add"
                      onClick={() => incrementValue(comment.id)}
                    >
                      +
                    </button>{" "}
                    <span className="result">{votes[comment.id]}</span>
                    <button
                      className="minus"
                      onClick={() => decrementValue(comment.id)}
                    >
                      -
                    </button>
                  </div>
                  <div className="reply">
                    <img
                      onClick={() => handleReplyClick(comment.id)}
                      src={reply_img}
                      alt=""
                    />
                    <span>Reply</span>
                  </div>
                </div>
              </div>

              <div>{activeReply === comment.id && <ShowReply />}</div>
            </div>
          ))}

        <div>
          {comments &&
            comments.map((comment) => (
              <div key={comment.id}>
                <div className="replies_container">
                  {comment.replies &&
                    comment.replies.map((reply, index, repliesArray) => {
                      const isLastReply = index === repliesArray.length - 1; // Determine if this is the last reply

                      if (isLastReply) {
                        // Render the last reply with different content and styling
                        return (
                          <div className="reply_container box" key={reply.id}>
                            <div className="absolute_container">
                              <div className="profile">
                                <img src={reply.user.image.png} alt="" />
                                <span className="user_name">
                                  {reply.user.username}
                                </span>
                                <span className="you">you</span>
                                <span className="date_comment">
                                  {reply.createdAt}
                                </span>
                              </div>
                              <p>
                                <span className="replying_to">
                                  @{reply.replyingTo}
                                </span>{" "}
                                {reply.content}
                              </p>
                            </div>

                            <div className="vote_container">
                              <div className="votes">
                                <button
                                  className="add"
                                  onClick={() => incrementValue(reply.id)}
                                >
                                  +
                                </button>
                                <span className="result">
                                  {votes[reply.id]}
                                </span>
                                <button
                                  className="minus"
                                  onClick={() => decrementValue(reply.id)}
                                >
                                  -
                                </button>
                              </div>
                              <div className="action_buttons">
                                <img
                                  onClick={handleDeleteClick}
                                  src={delete_icon}
                                  alt=""
                                />
                                <span onClick={handleDeleteClick}>Delete</span>
                                <img src={edit_icon} alt="" />
                                <span>Edit</span>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        // Render all other replies normally
                        return (
                          <div className="reply_container box" key={reply.id}>
                            <div className="absolute_container">
                              <div className="profile">
                                <img src={reply.user.image.png} alt="" />
                                <span className="user_name">
                                  {reply.user.username}
                                </span>
                                <span className="date_comment">
                                  {reply.createdAt}
                                </span>
                              </div>
                              <p>
                                <span className="replying_to">
                                  @{reply.replyingTo}
                                </span>{" "}
                                {reply.content}
                              </p>
                              <div className="vote_container">
                                <div className="votes">
                                  <button
                                    className="add"
                                    onClick={() => incrementValue(reply.id)}
                                  >
                                    +
                                  </button>
                                  <span className="result">
                                    {votes[reply.id]}
                                  </span>
                                  <button
                                    className="minus"
                                    onClick={() => decrementValue(reply.id)}
                                  >
                                    -
                                  </button>
                                </div>

                                <div className="reply first_reply">
                                  <img
                                    onClick={() => handleReplyClick(reply.id)}
                                    src={reply_img}
                                    alt="Reply Icon"
                                  />
                                  <span>Reply</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            ))}
        </div>

        <div className="reply_input">
          <div className="input">
            <input type="text" placeholder="Add a comment....." />
          </div>
          <div className="send">
            <img src={image} alt="" />
            <button className="send_btn">Send</button>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
