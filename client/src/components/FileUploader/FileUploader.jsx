import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import "./FileUploader.css";
import { showSuccessToast, showErrorToast } from "../Toast/ToastNotification"; // Assuming this is the correct path

function FileUploader({ onFileSelect }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        showErrorToast("No file selected or file type is not supported");
        return;
      }
      // Assuming you're only interested in the first file for simplicity
      const file = acceptedFiles[0];
      if (file.type !== "text/csv") {
        showErrorToast("Please upload a valid CSV file");
        return;
      }
      setFiles([...files, file]);
      showSuccessToast("File added successfully");
      onFileSelect(file.name);
    },
    [files, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
    multiple: false, // Set this to true if you wish to accept multiple files
  });

  const deleteFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
    showErrorToast("File removed");
  };

  // Function to handle the file upload logic
  const uploadFiles = () => {
    // You would upload the files here and provide feedback with toasts
    showSuccessToast("File(s) uploaded successfully");
    // If there was an error, you would use showErrorToast
  };

  return (
    <div className="file-uploader">
      <div
        {...getRootProps({ className: `dropzone ${isDragActive && "active"}` })}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Drop the CSV file here..."
            : "Drag and drop a CSV file here, or click to select one"}
        </p>
      </div>
      <ul className="file-list">
        {files.map((file) => (
          <li key={file.name} className="file-item">
            {file.name} - {file.size} bytes
            <CancelIcon
              className="delete-icon"
              onClick={() => deleteFile(file.name)}
            />
          </li>
        ))}
      </ul>
      <button className="upload-button" onClick={uploadFiles}>
        Upload Files
      </button>
    </div>
  );
}

export default FileUploader;
