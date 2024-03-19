// EditReply.js
import React, { useState } from 'react';

function EditReply({ id, content, onSave, onUpdate }) {
  const [editedContent, setEditedContent] = useState(content);

  const handleUpdate = () => {
    onUpdate(id, editedContent); // This will temporarily show the updated content in a div
  };

  const handleSave = () => {
    onSave(id, editedContent); // This will save the edited content permanently
  };

  return (
    <div>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditReply;
