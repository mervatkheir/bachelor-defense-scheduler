import React, { useState } from "react";
import FileUploader from "../../components/FileUploader/FileUploader";
import FileList from "../../components/FileList/FileList";
import "./UploadCSV.css";

function UploadCSV() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (fileName) => {
    setSelectedFile(fileName);
  };

  return (
    <div className="uploadCSV">
      <h1>Upload CSV File</h1>
      <FileUploader onFileSelect={handleFileSelect} />
      <h2>Uploaded Files</h2>
      <FileList onSelect={handleFileSelect} selectedFile={selectedFile} />
    </div>
  );
}

export default UploadCSV;
