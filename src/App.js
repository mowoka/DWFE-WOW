import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppContext } from "./Context/globalContext";
import { setAuthToken } from "./config/api";
import { API } from "./config/api";
import PrivateRouteUser from "./Components/PrivateRouteUser";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
import LandingPage from "./Pages/LandingPages/HomePage";
import LoginPage from "./Pages/LoginPages/Login";
import DaftarPage from "./Pages/DaftarPages/Daftar";
import Beranda from "./Pages/Beranda/Beranda";
import Subscribe from "./Pages/Subscibe/Subscribe";
import ProfileUser from "./Pages/Proffile-active/ProfileUser";
import DetailBook from "./Pages/DetailBook/DetailBook";
import ReadBook from "./Pages/ReadBook/ReadBook";
import Transaction from "./Pages/TransactionPages/Transaction";
import AddBook from "./Pages/AddBook/AddBook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      dispatch({
        type: "USER_LOADED",
        payload: response.data.data.user,
      });
    } catch (error) {
      return dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/daftar" exact component={DaftarPage} />
          <PrivateRouteUser path="/beranda" exact component={Beranda} />
          <PrivateRouteUser path="/subscribe" exact component={Subscribe} />
          <PrivateRouteUser
            path="/profile-user"
            exact
            component={ProfileUser}
          />
          <PrivateRouteUser path="/detail-book/:id" component={DetailBook} />
          <PrivateRouteUser path="/read-book" exact component={ReadBook} />
          <PrivateRouteAdmin
            path="/transactions"
            exact
            component={Transaction}
          />
          <PrivateRouteAdmin path="/add-book" exact component={AddBook} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
