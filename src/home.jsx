import useFetch from "./use_fetch";
import { useState } from "react";
import { useEffect } from "react";
import image from "../public/images/avatars/image-juliusomo.png";
import reply from "../public/images/icon-reply.svg"

const Home = () => {
  const { data: comments, isLoading } = useFetch(
    "http://localhost:3000/comments"
  );

  const [votes, setVotes] = useState({});

  useEffect(() => {
    if (comments && Array.isArray(comments)) {
      const initialVotes = {};
      comments.forEach(comment => {
        initialVotes[comment.id] = 12; // Assuming each comment starts with 12 votes
      });
      setVotes(initialVotes);
    }
  }, [comments]);

  const incrementValue = (commentId) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [commentId]: prevVotes[commentId] + 1,
    }));
  };

  const decrementValue = (commentId) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [commentId]: prevVotes[commentId] > 0 ? prevVotes[commentId] - 1 : 0,
    }));
  };




  return (
    <div className="container">
      <div className="comments_container">
        {/* {isLoading && <p className="loading_text">Loading...</p>} */}
        {comments &&
          comments.map((comment) => (
            <div className="comment_container box" key={comment.id}>
              <div className="profile">
                <img src={comment.user.image.png} alt="" />
                <span className="user_name">{comment.user.username}</span>
                <span className="date_comment">{comment.createdAt}</span>
              </div>
              <p>{comment.content}</p>
              <div className="vote_container">
                <div className="votes">
                  <button className="add" onClick={() => incrementValue(comment.id)}>+</button> <span className="result">{votes[comment.id]}</span><button className="minus" onClick={() => decrementValue(comment.id)}>-</button>
                </div>
                <div className="reply">
                  <img src={reply} alt="" />
                  <span>Reply</span>
                </div>

              </div>
            </div>
          ))}
        <div>
          {comments &&
            comments.map((comment) => (
              <div key={comment.id}>
                <div className="replies_container">
                  {comment &&
                    comment.replies.map((reply) => (
                      <div className="reply_container box" key={reply.id}>
                        <div className="profile">
                        <img src={reply.user.image.png} alt="" />
                        <span className="user_name">{reply.user.username}</span>
                        <span className="date_comment">{reply.createdAt}</span>
                        </div>
                        <p><span className="replying_to">@{reply.replyingTo}</span> {reply.content}</p>
                      </div>
                    ))}
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
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
