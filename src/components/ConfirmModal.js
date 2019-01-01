import React from "react";
import Modal from "react-modal";

const ConfirmModal = ({
  isOpen,
  onRequestClose,
  onRemove,
  expenseDescription
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmation Modal"
    closeTimeoutMS={300}
    appElement={document.getElementById("app")}
    className={"modal"}
  >
    <div className="modal__body">
      <button onClick={onRequestClose} className="modal__close" />
      <h3 className="modal__title">
        Are you sure you want to delete "{expenseDescription}"?
      </h3>
      <button onClick={onRemove} className="button removeExpense">
        Yes
      </button>
      <button onClick={onRequestClose} className="button button--danger">
        No
      </button>
    </div>
  </Modal>
);

export default ConfirmModal;
