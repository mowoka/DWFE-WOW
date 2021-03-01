import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { API, setAuthToken } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import { useHistory } from "react-router-dom";
import "./Daftar.css";

function Daftar({ handleLinkDaftar, showDaftar, handleCloseDaftar }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);
  const { email, password, fullName } = registerFormData;

  const onChangeRegister = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitDaftar = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        email,
        password,
        fullName,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setIsLoading(true);

      const post = await API.post("/register", body, config);

      const response = post.data.message;
      setMessage(response);

      setIsLoading(false);

      login();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const body = JSON.stringify({
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const post = await API.post("/login", body, config);

      setMessage(post.data.message);

      if (post.data.message == "Login Success") {
        setAuthToken(post.data.data.user.token);

        dispatch({
          type: "ADD_TOKEN",
          payload: post.data.data.user,
        });
        instanceProfile();
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Fungsi Login tidak berjalan di register");
      console.log(error);
    }
  };

  const instanceProfile = async () => {
    try {
      const body = JSON.stringify({
        gender: "Male / Female",
        noHp: "08xxxxxxxxxx",
        alamat: "The Addresss",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(body);

      const profile = await API.post("/add-instance-profile", body, config);

      const response = profile.data.status;

      if (response === "Success") {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: profile.data.data.profile,
        });
        history.push("/beranda");
      }
    } catch (error) {
      console.log("Instance profile Gagal");
    }
  };

  return (
    <Modal size="md" show={showDaftar} onHide={handleCloseDaftar} centered>
      <Modal.Body>
        <div className="daftar-container">
          <p>Sign Up</p>
          {message ? (
            <div
              className={
                message == "Email Already Register"
                  ? "daftar-message bg-waring"
                  : message == "Register Success"
                  ? "daftar-message bg-success"
                  : "daftar-message bg-error"
              }
            >
              {message}
            </div>
          ) : (
            <div className="daftar-message"></div>
          )}

          <div className="form--container">
            <form onSubmit={onSubmitDaftar}>
              <input
                style={{
                  width: "420px",
                  height: "45px",
                  fontSize: "17px",
                }}
                type="email"
                className="form-control background--gray"
                placeholder="Email"
                name="email"
                onChange={(e) => onChangeRegister(e)}
              />
              <input
                style={{
                  marginTop: "30px",
                  width: "420px",
                  height: "45px",
                  fontSize: "17px",
                }}
                type="password"
                className="form-control background--gray"
                placeholder="password"
                name="password"
                onChange={(e) => onChangeRegister(e)}
              />
              <input
                style={{
                  marginTop: "30px",
                  width: "420px",
                  height: "45px",
                  fontSize: "17px",
                }}
                type="text"
                className="form-control background--gray"
                placeholder="Full Name"
                name="fullName"
                onChange={(e) => onChangeRegister(e)}
              />
              <input
                type="submit"
                className="btn btn-danger form-btn "
                value="Sign Up"
              />
            </form>
            <p className="end-text">
              Already have an account ? Klik
              <span onClick={handleLinkDaftar}> Here</span>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Daftar;
