import React from "react";
import { Modal } from "react-bootstrap";

const ComponentPopup = ({ show, handleClose, status }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div
            style={{ textAlign: "center" }}
            className={
              status === "Success" ? "--color-text-green" : "--color-text-red"
            }
          >
            {status === "Success"
              ? "Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you"
              : "please make a payment to read the latest books"}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ComponentPopup;
