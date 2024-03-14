import profile_pic from '../public/images/avatars/image-juliusomo.png';
import DynamicTextarea from './textarea';


const ShowReply = () => {

  // console.log('This works')

  return (
    <div className="reply_box">
      <div>
        <img src={profile_pic} alt="" />
      </div>
      
      <DynamicTextarea/>

      <div>
        <button className='reply__btn'>Reply</button>
      </div>
    </div>
  );
};

export default ShowReply;
