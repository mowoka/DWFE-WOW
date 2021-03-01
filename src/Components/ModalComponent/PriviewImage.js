import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const PriviewImage = ({ preview, show, handleClosePriview }) => {
  return (
    <>
      <Modal centered show={show} onHide={handleClosePriview}>
        <Modal.Body>
          <div>
            {
              <img
                style={{
                  width: "480px",
                  height: "500px",
                }}
                src={preview ? preview : null}
              />
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PriviewImage;
