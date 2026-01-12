import React from "react";
import "./view.css";

const ViewTask = ({ task, onClose }) => {
  return (
    <div className="view-overlay">
      <div className="view-container">
        <button className="view-close-btn" onClick={onClose} aria-label="Close view dialog">
          &#215;
        </button>
        <h2 className="view-heading">View Task</h2>
        
        <div className="view-content">
          <div className="view-field">
            <label className="view-label">TITLE</label>
            <div className="view-text">{task?.title || ""}</div>
          </div>

          <div className="view-field">
            <label className="view-label">CONTENT</label>
            <div className="view-text view-body">{task?.body || ""}</div>
          </div>
        </div>

        {/* <div className="view-buttons">
          <button className="btn-close-view" onClick={onClose}>
            Close
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ViewTask;

