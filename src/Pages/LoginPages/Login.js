import React, { useState, useContext } from "react";
import "./Login.css";
import { API, setAuthToken } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import { useHistory } from "react-router-dom";

import { Modal } from "react-bootstrap";
function Login({ handleLinkLogin, showLogin, handleCloseLogin }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [state, dispatch] = useContext(AppContext);

  const history = useHistory();

  const { email, password } = loginFormData;

  const onChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
        if (post.data.data.user.role == "ADMIN") {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: post.data.data.user,
          });
          history.push("/transactions");
        } else {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: post.data.data.user,
          });
          history.push("/beranda");
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="md" show={showLogin} onHide={handleCloseLogin} centered>
      <Modal.Body>
        <div className="login-container">
          <p>Sign In</p>
          {message ? (
            <div
              className={
                message == "Login Success"
                  ? "login-message bg-success"
                  : "login-message bg-error"
              }
            >
              {message}
            </div>
          ) : (
            <div className="daftar-message"></div>
          )}
          <div className="form--container">
            <form onSubmit={(e) => onSubmit(e)}>
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
                onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
              />
              <input
                type="submit"
                className="btn btn-danger form-btn"
                value="Sign in"
              />
            </form>
            <p className="end-text">
              Don't have an account ? Klik{" "}
              <span onClick={handleLinkLogin}>Here</span>
            </p>
            {/* <p>
          <pre>{JSON.stringify(loginFormData, null, 2)}</pre>
        </p> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
