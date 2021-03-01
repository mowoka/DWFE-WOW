import React from "react";
import { useHistory } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";
import Headline from "./Headline";
import ListBooks from "./ListBooks";

const ComponentBeranda = ({ Books }) => {
  const history = useHistory();

  const goDetailBookPage = (id) => {
    const bookFilter = Books.filter((book) => book.id === id);

    const bookId = bookFilter[0].id;
    // console.log(bookFilter[0].id);
    history.push(`/detail-book/${bookId}`);
  };

  return (
    <>
      {/* <Modal show={showPopupSubscribe} onHide={handleClosePopupConntent}>
        <Modal.Body>
          <div className="popup--input-subscribe">
            <p>
              Thank you for subscribing to premium, your premium package will be
              active after our admin approves your transaction, thank you
            </p>
          </div>
        </Modal.Body>
      </Modal>
      {!subscribe ? (
        <Modal show={showPopupLogin} onHide={handleClosePopupConntentLogin}>
          <Modal.Body>
            <div className="popup--input-notif">
              <p>please make a payment to read the latest books</p>
            </div>
          </Modal.Body>
        </Modal>
      ) : null} */}

      <div className="content--stage-one">
        <Headline />
      </div>
      <div className="content--stage-two">
        <div className="book--content">
          <h3>List Book</h3>
        </div>
        <div className="book--content-menu">
          {Books.map((book, index) => (
            <ListBooks book={book} goDetailBookPage={goDetailBookPage} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ComponentBeranda;
