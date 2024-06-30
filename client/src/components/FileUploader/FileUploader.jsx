import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import "./FileUploader.css";
import { showSuccessToast, showErrorToast } from "../Toast/ToastNotification";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../../api/schedule.js";
import { setSchedule } from "../../redux/scheduleSlice.js";
import { addFile } from "../../redux/fileManagementSlice.js";

function FileUploader({ onFileSelect }) {
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      dispatch(
        setSchedule({
          fileName: file.name,
          data,
        })
      );
      dispatch(addFile(file.name));
      showSuccessToast("File uploaded successfully");
      setFile(null);
    },
    onError: () => {
      showErrorToast("Failed to upload file");
    },
  });

  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (!newFile) {
        showErrorToast("No file selected or file type is not supported");
        return;
      }
      if (newFile.type !== "text/csv") {
        showErrorToast("Please upload a valid CSV file");
        return;
      }
      setFile(newFile);
      showSuccessToast("File added successfully");
      onFileSelect(newFile.name);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
    multiple: false,
  });

  const deleteFile = () => {
    setFile(null);
    showErrorToast("File removed");
  };

  const uploadFiles = () => {
    if (file) {
      mutation.mutate(file);
    } else {
      showErrorToast("No file to upload");
    }
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
        {file && (
          <ul className="file-list">
            <li className="file-item">
              {file.name} - {file.size} bytes
              <CancelIcon className="delete-icon" onClick={deleteFile} />
            </li>
          </ul>
        )}
      </ul>
      <button className="upload-button" onClick={uploadFiles}>
        Upload Files
      </button>
    </div>
  );
}

export default FileUploader;
