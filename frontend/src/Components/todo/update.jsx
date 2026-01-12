import React, { useState } from "react";
import "./update.css";

const update = ({ task, onUpdate, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [body, setBody] = useState(task?.body || "");

  const handleUpdate = () => {
    if (!title || !body) {
      console.log("Please fill all fields");
      return;
    }
    onUpdate({ title, body });
  };

  return (
    <div className="update-overlay">
      <div className="update-container">
        <button className="update-close-btn" onClick={onClose} aria-label="Close update dialog">
          &#215;
        </button>
        <h2 className="update-heading">Update Your Task</h2>
        
        <input
          type="text"
          className="update-input"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="update-textarea"
          placeholder="BODY"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="6"
        />

        <div className="update-buttons">
          <button className="btn-update" onClick={handleUpdate}>
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default update;