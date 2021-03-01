import React, { useState, useEffect } from "react";
import "./Subscribe.css";
import Profile from "../../Components/Profile";
import ComponentPopup from "../../Components/ComponentPopup";
import PriviewImage from "../../Components/ModalComponent/PriviewImage";
import { Form } from "react-bootstrap";
import { API } from "../../config/api";

const Subscribe = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  // const [fileForm, setFileForm] = useState({
  //   file: null,
  // });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showPriview, setShowPriview] = useState(false);
  const [preview, setPreview] = useState();
  const [formSubscribe, setFormSubscribe] = useState({
    accountNumber: "",
    imageFile: null,
  });

  const { accountNumber, imageFile } = formSubscribe;
  // const { file } = fileForm;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("accountNumber", accountNumber);
      body.append("imageFile", imageFile);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      if (body.imageFile == null) {
        setMessage("Please Upload Image");
      }

      setLoading(true);
      const post = await API.post("/transaction", body, config);

      setLoading(false);

      const response = post.data.message;

      setMessage(response);

      if (response === "Transaction Successfully added") {
        setStatus("Success");
        handleShow();
      }
    } catch (error) {
      console.log(error);
      console.log("Probelm pada onSubmit Subcribe");
    }
  };
  const onChange = (e) => {
    const updateForm = { ...formSubscribe };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    if (e.target.type === "file") {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    setFormSubscribe(updateForm);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClosePriview = () => setShowPriview(false);

  const handleShowPriview = () => setShowPriview(true);

  return (
    <>
      <div className="beranda-container">
        <div className="beranda--container-profile">
          <Profile />
        </div>
        <div className="beranda--container-content">
          <ComponentPopup
            show={show}
            handleClose={handleClose}
            status={status}
          />
          <div className="subscribe--container">
            <div className="subscribe--content">
              <h3>Premium</h3>
              <div className="subscribe--description">
                <p>Pay now and access all the best latest books from</p>
                <img src="image/beranda/wow-small.png" alt="small-wow" />
              </div>
              <div className="subscribe--phone">
                <img src="image/beranda/wow-small.png" alt="small-wow" />
                <p> : 083821148288</p>
              </div>
              <div className="subscribe--message">
                {message ? (
                  <div
                    className={
                      message === "Transaction Successfully added"
                        ? "--bg-green"
                        : "--bg-red"
                    }
                  >
                    {message}
                  </div>
                ) : null}
              </div>
              <div className="subscribe--forms">
                <form onSubmit={(e) => onSubmit(e)}>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Control
                      style={{
                        width: "350px",
                        height: "50px",
                        fontSize: "17px",
                      }}
                      type="text"
                      name="accountNumber"
                      placeholder="Input your account number"
                      className="background--gray"
                      onChange={(e) => onChange(e)}
                    />
                  </Form.Group>
                  <label for="actual-btn" className="form--file">
                    <p>Attact proof of transfer</p>
                    <img src="image/beranda/attact-icon.png" alt="attac-icon" />
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={(e) => onChange(e)}
                    // onChange={(e) => handleChange(e)}
                    id="actual-btn"
                    hidden
                  />
                  <div className="mb-3" style={{ height: "20px" }}>
                    {preview ? (
                      <div onClick={handleShowPriview}>
                        <p>Priview</p>
                        <PriviewImage
                          preview={preview}
                          show={showPriview}
                          handleClosePriview={handleClosePriview}
                        />
                      </div>
                    ) : null}
                    {/* <img src={preview ? preview : null} /> */}
                  </div>
                  <input
                    className="btn btn-danger btn-sumbit mt-2"
                    type="submit"
                    value="Send"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
