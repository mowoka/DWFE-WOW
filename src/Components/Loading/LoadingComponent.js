import React from "react";
import Spinner from "react-spinner-material";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="loading--container">
      <Spinner
        size={120}
        spinnerColor={"#333"}
        spinnerWidth={2}
        visible={true}
      />
    </div>
  );
};

export default LoadingComponent;
