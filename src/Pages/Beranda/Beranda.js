import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Beranda.css";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import LoadingComponent from "../../Components/Loading/LoadingComponent";
import Profile from "../../Components/Profile";
import ComponentBeranda from "../../Components/ComponentBeranda";

function Beranda() {
  const [state, dispatch] = useContext(AppContext);
  const [bookList, setBookList] = useState([]);

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const GetBook = async () => {
    try {
      setLoading(true);

      const profile = await API.get("/books");

      const response = profile.data.data.books;

      setBookList(response);
      setLoading(false);
    } catch (error) {
      console.log("Books not Found");
    }
  };

  useEffect(() => {
    GetBook();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="beranda-container">
          <div className="beranda--container-profile">
            <Profile />
          </div>
          {console.log(bookList)}
          <div className="beranda--container-content">
            <ComponentBeranda Books={bookList} />
          </div>
        </div>
      )}
    </>
  );
}

export default Beranda;
