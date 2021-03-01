import React, { useState } from "react";
import "./ReadBook.css";
import { ReactReader, EpubView } from "react-reader";

const ReadBook = () => {
  return (
    <div className="read--book-container">
      <div className="read-title">
        <img src="image/beranda/wow-icon.png" alt="wow" />
      </div>
      <div className="read-book">
        <div style={{ position: "relative", height: "100%" }}>
          <ReactReader
            url={"file/alice.epub"}
            title={"Alice in wonderland"}
            // location={"epubcfi(/6/2[cover]!/6)"}
            // locationChanged={(epubcifi) => console.log(epubcifi)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadBook;
