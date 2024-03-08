import useFetch from "./use_fetch";

const Home = () => {
  const { data: comments, isLoading } = useFetch(
    "http://localhost:3000/comments"
  );

  return (
    <div className="container">
      <div className="comments_container">
        {isLoading && <p className="loading_text">Loading...</p>}
        {comments &&
          comments.map((comment) => (
            <div className="comment_container box" key={comment.id}>
              <div className="profile">
                <img src={comment.user.image.png} alt="" />
                <span className="user_name">{comment.user.username}</span>
                <span className="date_comment">{comment.createdAt}</span>
              </div>
              <p>{comment.content}</p>
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
                        <p>{reply.content}</p>
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
            <img src="" alt="" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
