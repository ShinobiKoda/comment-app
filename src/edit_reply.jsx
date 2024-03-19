import React, { useState } from "react";

const EditReply = ({ id, content, onSave, onCancel }) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(id, editedContent);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="edit-reply">
      <input
        type="text"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditReply;
