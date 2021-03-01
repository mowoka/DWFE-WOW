import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./AddBook.css";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";

const AddBook = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const { user } = state;
  const linkImageDefault = `http://localhost:5000/uploads/${user.profileImage}`;

  const [formBook, setFormBook] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    epubFile: null,
  });

  const {
    title,
    publicationDate,
    pages,
    author,
    isbn,
    about,
    epubFile,
  } = formBook;

  const onChange = (e) => {
    const updateForm = { ...formBook };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormBook(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("title", title);
      body.append("publicationDate", publicationDate);
      body.append("pages", pages);
      body.append("author", author);
      body.append("isbn", isbn);
      body.append("about", about);
      body.append("epubFile", epubFile);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // if (body.epubFile == null) {
      //   setMessage("Please Upload File Epub");
      // }

      setLoading(true);
      const post = await API.post("/book", body, config);

      setLoading(false);

      const response = post.data;

      setMessage(response.message);

      if (response.status == "Success") {
        setFormBook({
          title: "",
          publicationDate: "",
          pages: "",
          author: "",
          isbn: "",
          about: "",
        });
      }
    } catch (error) {
      console.log(error);
      console.log("Probelm pada onSubmit AddBook");
    }
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);

  return (
    <div className="addbook--menu-container">
      <div className="transaction--menu-header">
        <div className="header--menu-logo">
          <img src="image/beranda/wow-icon.png" alt="wow-logo" />
        </div>
        <div className="header--menu-profile">
          <img
            style={{
              display: "inline-block",
              position: "relative",
              borderRadius: "50%",
            }}
            src={
              linkImageDefault
                ? linkImageDefault
                : "image/beranda/admin-icon.png"
            }
            alt="admin-avatar"
            onClick={handleShowDropDownProfile}
          />
          {showDropDownProfile ? (
            <div className="dropdown--menu-profile">
              <div className="dropdown--poligon">
                <img src="image/beranda/action-icon-2.png" alt="arrow" />
              </div>
              <div className="dropdown--menu-list">
                <div className="dropdown--addbook">
                  <Link to="/transactions">
                    <BookIcon
                      style={{
                        color: "#929292",
                        fontSize: "30px",
                        marginTop: "4px",
                      }}
                    />
                    <p style={{ marginLeft: "10px" }}>Transaction </p>
                  </Link>
                </div>
                <div className="dropdown--logout">
                  <Link onClick={handleLogout} to="/">
                    <ExitToAppIcon
                      className="text-deactive"
                      style={{
                        fontSize: "30px",
                        marginTop: "4px",
                      }}
                    />
                    <p style={{ marginLeft: "10px" }}>Logout</p>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="addbook--menu-body">
        <div className="addbook--body-title">
          <p>Add Book</p>
        </div>
        <div className="addbook--message">
          {message ? (
            <div
              className={
                message === "Book Successfully added"
                  ? "--bg-green"
                  : "--bg-red"
              }
            >
              {message}
            </div>
          ) : null}
        </div>
        <div className="addbook--body-form">
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder="Title"
              className="form-control form-body-input"
              name="title"
              onChange={(e) => onChange(e)}
              value={title}
            />
            <input
              type="text"
              placeholder="Publication Date"
              className="form-control form-body-input"
              name="publicationDate"
              onChange={(e) => onChange(e)}
              value={publicationDate}
            />
            <input
              type="text"
              placeholder="Pages"
              className="form-control form-body-input"
              name="pages"
              onChange={(e) => onChange(e)}
              value={pages}
            />
            <input
              type="text"
              placeholder="Author"
              className="form-control form-body-input"
              name="author"
              onChange={(e) => onChange(e)}
              value={author}
            />
            <input
              type="text"
              placeholder="ISBN"
              className="form-control form-body-input"
              name="isbn"
              onChange={(e) => onChange(e)}
              value={isbn}
            />
            <input
              type="text"
              placeholder="About This Book"
              className="form-control form-body-input-about"
              name="about"
              onChange={(e) => onChange(e)}
              value={about}
            />
            <input
              type="file"
              id="actual-btn"
              hidden
              onChange={(e) => onChange(e)}
              name="epubFile"
            />
            <label
              style={{ marginTop: "30px" }}
              for="actual-btn"
              className="form-body-file"
            >
              <p>Attact Boook File</p>
              <img src="image/beranda/attact-icon-2.png" alt="attac-icon" />
            </label>
            <div className="mb-3" style={{ height: "20px" }}>
              {epubFile ? epubFile.name : null}
            </div>
            <div className="form-body-submit">
              <input type="submit" value="Add Book" className="submit-btn" />
              <img src="image/beranda/addbook.png" alt="addbook" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
