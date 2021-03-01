import React, { useState, useEffect } from "react";
import "./DetailBook.css";
import { API } from "../../config/api";
import { useHistory } from "react-router-dom";
import Cover from "../../Components/Assets/tess.png";
import Wow from "../../Components/Assets/wow-icon.png";
import LoadingComponent from "../../Components/Loading/LoadingComponent";
import Profile from "../../Components/Profile";
import AddIcon from "@material-ui/icons/Add";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const DetailBook = ({ match }) => {
  const booksList = true;
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookFile: "",
  });
  const history = useHistory();
  const id = match.params.id;
  const { title, publicationDate, pages, author, isbn, about, bookFile } = book;
  const linkImage = `http://localhost:5000/uploads/${bookFile}`;

  const getBook = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/book/${id}`);

      setBook({
        title: response.data.data.book.title,
        publicationDate: response.data.data.book.publicationDate,
        pages: response.data.data.book.pages,
        author: response.data.data.book.author,
        isbn: response.data.data.book.isbn,
        about: response.data.data.book.about,
        bookFile: response.data.data.book.bookFile,
      });

      setLoading(false);
    } catch (error) {
      console.log("Book  not Found");
    }
  };

  const handleReadBook = () => {
    history.push("/read-book");
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="beranda-container">
          <div className="beranda--container-profile">
            <Profile Wow={Wow} />
          </div>
          <div className="beranda--container-content">
            <div className="book--detail-container">
              <div className="book--detail-title">
                <div className="detail-content-image">
                  <img src={Cover} alt="gambar-buku" />
                </div>
                <div className="detail-content-description">
                  <div className="content-book-title">
                    <h2>{title}</h2>
                    <p>{author}</p>
                  </div>
                  <div className="content-book-publish">
                    <h2>Publication date</h2>
                    <p>{publicationDate}</p>
                  </div>
                  <div className="content-book-page">
                    <h2>Pages</h2>
                    <p>{pages}</p>
                  </div>
                  <div className="content-book-Type">
                    <h2>ISBN</h2>
                    <p>{isbn}</p>
                  </div>
                </div>
              </div>
              <div className="book--detail-description">
                <div className="--detail-description-title">
                  <h2>About This Book</h2>
                </div>
                <div className="--detail-description-text">
                  <p>{about}</p>
                </div>
              </div>
              <div className="book-detail-action">
                <div className={booksList ? "action-adding" : "active"}>
                  <p>Add My List</p>
                  <AddIcon className="add-btn" />
                </div>

                <div onClick={handleReadBook} className="action-read">
                  <p>Read Book </p>
                  <ChevronRightIcon className="read-btn" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBook;
