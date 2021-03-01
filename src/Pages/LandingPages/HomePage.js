import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import { AppContext } from "../../Context/globalContext";
import Login from "../LoginPages/Login";
import Daftar from "../DaftarPages/Daftar";

function HomePage() {
  const [state] = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (state.isLogin && state.user.role === "ADMIN") {
      history.push("/transactions");
    } else if (state.isLogin && state.user.role === "User") {
      history.push("/beranda");
    }
  }, [state]);

  const [showDaftar, setShowDaftar] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDaftar = () => setShowDaftar(false);
  const handleShowDaftar = () => setShowDaftar(true);
  const handleLinkDaftar = () => {
    setShowDaftar(false);
    setShowLogin(true);
  };
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleLinkLogin = () => {
    setShowLogin(false);
    setShowDaftar(true);
  };

  return (
    <div className="container-homepage">
      <img src="image/page_1/vektor.png" alt="background" />
      <div className="content">
        <div className="content-image">
          <img src="image/page_1/wow-icon.png" alt="text-awal" />
        </div>
        <div className="content-text">
          <p>
            Sign-up now and subscribe to enjoy all the cool and latest books -
            The best book rental service provider in indonesia
          </p>
          <div className="btn-landing">
            <div onClick={() => handleShowDaftar()} className="btn-danger">
              Sign Up
            </div>
            {showDaftar ? (
              <Daftar
                handleLinkDaftar={handleLinkDaftar}
                showDaftar={showDaftar}
                handleCloseDaftar={handleCloseDaftar}
              />
            ) : null}

            <div onClick={() => handleShowLogin()} className="btn-primary">
              Sign In
            </div>
            {showLogin ? (
              <Login
                handleLinkLogin={handleLinkLogin}
                showLogin={showLogin}
                handleCloseLogin={handleCloseLogin}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
