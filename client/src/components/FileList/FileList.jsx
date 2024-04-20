import React from "react";
import "./FileList.css";

function FileList({ onSelect, selectedFile }) {
  const files = ["file1.csv", "file2.csv", "file3.csv"]; // Replace with state if dynamic

  return (
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
  );
}

export default FileList;
