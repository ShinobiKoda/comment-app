// Modal.js
const Modal = ({ show, onClose, onDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Comment</h3>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div className="confirm_buttons">
          <button className="cancel" onClick={onClose}>No, Cancel</button>
          <button className="delete" onClick={onDelete}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
