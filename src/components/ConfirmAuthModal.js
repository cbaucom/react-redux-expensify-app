import React from "react";
import Modal from "react-modal";

const ConfirmModal = ({
  isOpen,
  onRequestClose,
  addNewAccount,
  providerName
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirmation Modal"
    closeTimeoutMS={200}
    appElement={document.getElementById("app")}
    className={"modal"}
  >
    <div className="modal__body">
      <button onClick={onRequestClose} className="modal__close" />
      <h3 className="modal__title">
        You already authenticated with a "{providerName}". Do you want to sign
        in with a different account?
      </h3>
      <button onClick={addNewAccount} className="button removeExpense">
        Yes
      </button>
      <button onClick={onRequestClose} className="button button--danger">
        No
      </button>
    </div>
  </Modal>
);

export default ConfirmModal;
