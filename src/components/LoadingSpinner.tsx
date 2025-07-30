import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span className="loading-text">Memuat data...</span>
    </div>
  );
};

export default LoadingSpinner;
