import React from "react";
import "./FileList.css";

function FileList({ onSelect, onSchedule, selectedFile }) {
  const files = ["file1.csv", "file2.csv", "file3.csv"];

  return (
    <div>
      <ul className="fileList">
        {files.map((file, index) => (
          <li
            key={index}
            className={`fileItem ${selectedFile === file ? "selected" : ""}`}
            onClick={() => onSelect(file)}
          >
            {file}
          </li>
        ))}
      </ul>
      <button
        className="scheduleButton"
        onClick={() => selectedFile && onSchedule(selectedFile)}
        disabled={!selectedFile}
        style={{
          display: "block",
          width: "30%",
          padding: "10px",
          marginTop: "10px",
          backgroundColor: selectedFile ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: selectedFile ? "pointer" : "default",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Schedule Selected File
      </button>
    </div>
  );
}

export default FileList;
