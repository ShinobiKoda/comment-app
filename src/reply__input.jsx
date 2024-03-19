import image from "../public/images/avatars/image-juliusomo.png";





const ReplyInput = () => {
  return (
    <div className="reply_input">
      <div className="input">
        <input type="text" placeholder="Add a comment....." />
      </div>
      <div className="send">
        <img src={image} alt="" />
        <button className="send_btn">Send</button>
      </div>
    </div>
  );
};

export default ReplyInput;