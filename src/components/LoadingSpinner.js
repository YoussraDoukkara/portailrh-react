import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./../LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <FontAwesomeIcon icon={faSpinner} size="3x" spin />
    </div>
  );
};

export default LoadingSpinner;
