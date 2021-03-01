import React from "react";

const UserBooks = ({ book, goDetailBookPage }) => {
  return (
    <div
      key={book.id}
      onClick={goDetailBookPage}
      className="user--book-content"
    >
      <img src={book.img} alt={book.alt} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
};

export default UserBooks;
