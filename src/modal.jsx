// Modal.js
const Modal = ({ show, onClose, onDelete }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Are you sure you want to delete this item?</p>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
