import React, { useState } from 'react';

const DynamicTextarea = ({ placeholder }) => {
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    const textarea = e.target;
    setText(textarea.value);

    // Dynamically adjust the height
    textarea.style.height = 'auto'; // Reset height first to ensure proper height calculation
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      className="reply_box"
      placeholder={placeholder}
      value={text}
      onChange={handleInputChange}
      style={{ 
        width: '100%', 
        padding: '0.7rem', 
        margin: '0',
        borderRadius: '0.4rem', 
        border: '1px solid #000', 
        resize: 'none', 
        overflowY: 'hidden'
       }}
    />
  );
};

export default DynamicTextarea;
