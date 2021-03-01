import React from "react";

const ListBooks = ({ book, goDetailBookPage }) => {
  return (
    <div
      onClick={() => goDetailBookPage(book.id)}
      className="content-menu"
      key={book.id}
    >
      <img
        src={book.img ? book.img : "image/beranda/tess.png"}
        alt={book.alt}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
};

export default ListBooks;
